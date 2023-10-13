import { Card } from '../models/index.js';
import { Op } from 'sequelize';
import sequelize from './../sequelize-client.js';

const cardController = {

  async getAllCards(req, res) {
    try {
      const userId = req.user.id;

      const cards = await Card.findAll({ where: { userId } });
      if (!cards)
        return res.status(404).json("Aucune fiche n'a été trouvée");

      res.status(200).json(cards);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async getCardById(req, res) {
    try {
      const userId = req.user.id;
      const id = req.params.id;

      const card = await Card.findOne({ where : { id, userId },
        include: ['contacts', 'documents'] });
      if (!card)
        return res.status(404).json (`La fiche avec l'id ${id} n'existe pas`);

      res.status(200).json(card);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async createNewCard(req, res) {
    try {
      const userId = req.user.id;
      const newCardInfos = req.body;

      const creationTransaction = await sequelize.transaction();

      try {
        // Get the highest index in the category in which the card is created
        const highestIndexInCategory = await Card.max('index', {
          where: { 
            userId, 
            isDeleted: false, 
            category: newCardInfos.category 
          },
          transaction: creationTransaction
        });
        
        // New card index will be 0 if no card is currently in the category
        let newCardIndex = 0;
        if (highestIndexInCategory != null) {
          newCardIndex = highestIndexInCategory + 1;
        }

      // New card is created according to the data provided by the user
        const newCard = await Card.create({ ...newCardInfos, index: newCardIndex, userId }, {
          transaction: creationTransaction
        });
        
        await creationTransaction.commit();
        res.status(201).json(newCard);

      } catch(error) {
        await creationTransaction.rollback();   // Cancel the whole transaction
        throw new Error('Impossible de créer la fiche');
      }

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async modifyCard(req, res) {
    try {
      const userId = req.user.id;
      const { id, ...newInfos } = req.body;

      const card = await Card.findOne({ where : { id, userId } });
      if (!card)
        return res.status(404).json("Impossible de trouver la fiche dans la base");

      const cardIsModified = await card.update({ ...newInfos });
      if (!cardIsModified)
        throw new Error("Impossible de modifier la fiche");

      res.status(200).json(card);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async moveCard(req, res) {
    try {
      const userId = req.user.id;
      const { id, newIndex, newCategory } = req.body;
      const newCardIndex = Number(newIndex);

      const card = await Card.findOne({ where : { id, userId, isDeleted: false } });
      if (!card)
        return res.status(404).json("Impossible de trouver la fiche dans la base");

      // Get the original category and index of the moving card
      const oldCategory = card.category;
      const oldIndex = card.index;

      // Create a new sequelize transaction to optimize the amount of queries done to the DB
      // It allows us to cancel everything if one the operations failed, preventing index duplicates in the DB
      const indexChangesTransaction = await sequelize.transaction();

      try {

        // Change the index and category (if needed) of the moving card
        await card.update({ index: newCardIndex, category: newCategory }, {
          transaction: indexChangesTransaction
        });

        // If the card changed category
        if (newCategory !== oldCategory) {
        // Change the index of the cards from the old category
          await Card.decrement({ index: 1 }, {   // Decrement index of the cards in the old category
            where: {
              userId,
              category: oldCategory,   // If they belong to the old category
              isDeleted: false, // If they are in the dashboard
              index : { [Op.gt]: oldIndex }         // And their index > the moving card's old index in the old category
            },
            transaction: indexChangesTransaction
          });
          await Card.increment({ index: 1 }, {   // Increment index of the cards in the new category
            where: {
              id: {
                [Op.ne]: card.id    // If it is not the moving card
              },
              userId,
              category: newCategory,
              isDeleted: false,
              index : { [Op.gte]: newIndex }         // If their index >= the moving card's index in the new category
            },
            transaction: indexChangesTransaction
          });
        } else { // If the card moved in the same category
          if (newIndex > oldIndex) {
            await Card.decrement({ index: 1 }, {   // Decrement index of the cards in the category
              where: {
                id: {
                  [Op.ne]: card.id
                },
                userId,
                category: newCategory,   
                isDeleted: false,
                index: { [Op.lte]: newIndex, [Op.gt]: oldIndex }         // And their index <= the moving card's new index and > old index
              },
              transaction: indexChangesTransaction
            });
          } else {
              await Card.increment({ index: 1 }, {   // Increment index of the cards in the category
                where: {
                  id: {
                    [Op.ne]: card.id
                  },
                  userId,
                  category: newCategory,   
                  isDeleted: false,
                  index: { [Op.gte]: newIndex, [Op.lt]: oldIndex }         // If their index >= the moving card's new index and < old index
                },
                transaction: indexChangesTransaction
              });
          }
        }

        await indexChangesTransaction.commit();   // Execute the whole transaction
        res.status(200).json(card);
        
      } catch(error) {
        await indexChangesTransaction.rollback();   // Cancel the whole transaction
        throw new Error('Impossible de déplacer la fiche');
      }

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async sendCardToTrash(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.body;

      const cardToTrash = await Card.findOne({ where : { id, userId, isDeleted: false } });
      // db.query('SELECT * FROM card WHERE id = $1 AND user_id = $2 AND is_deleted = FALSE;', [id, userId]); 
      if (!cardToTrash)
        return res.status(404).json("Impossible de trouver la fiche dans le dashboard");

      const index = cardToTrash.index;
      const category = cardToTrash.category;
      
      const sendToTrashTransaction = await sequelize.transaction();
      
      try {
        // Decrement the index of the cards belonging to the category of the card being sent to trash
        await Card.decrement({ index: 1 }, {
          where: {
            userId,
            isDeleted: false, // If they are not already in the trash
            category,   // If they belong to the same category
            index : { [Op.gt]: index }   // And their index > the card to send to trash
          },
          transaction: sendToTrashTransaction
        });
        // db.query('UPDATE card SET index = index - 1 WHERE user_id = $1 AND is_deleted = FALSE AND category = $2 AND index > $3;', [userId, category, index]);

        // Get the highest index of the user's trashed cards
        const highestIndexInTrash = await Card.max('index', {
          where: { 
            userId,
            isDeleted: true 
          },
          transaction: sendToTrashTransaction
        });
        // db.query('SELECT MAX(index) FROM card WHERE user_id = $1 AND is_deleted = TRUE;', [userId]);

        // New card index will be 0 if no card is currently in the trash
        let newIndex = 0;
        if (highestIndexInTrash != null) {
          newIndex = highestIndexInTrash + 1;
        }

        await cardToTrash.update({ isDeleted: true, index: newIndex }, {
          transaction: sendToTrashTransaction
        });
        // db.query('UPDATE card SET is_deleted = TRUE, index = $1 WHERE id = $2 AND user_id = $3;', [newIndex, id, userId]);
        
        await sendToTrashTransaction.commit();   // Execute the whole transaction

        res.status(200).json(cardToTrash);

      } catch(error) {
        await sendToTrashTransaction.rollback();   // Cancel the whole transaction
        throw new Error('Impossible d\'envoyer la fiche à la corbeille');
      }
    
    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async restoreCard(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.body;

      const cardToRestore = await Card.findOne({ where : { id, userId, isDeleted: true } });
      if (!cardToRestore)
        return res.status(404).json("Impossible de trouver la fiche dans la corbeille");

      const index = cardToRestore.index;
      const category = cardToRestore.category;
      
      const restoreCardTransaction = await sequelize.transaction();
      
      try {
        // We will decrement the indexes of the other trashed cards
        await Card.decrement({ index: 1 }, {   // Decrement index of the cards
          where: {
            userId,
            isDeleted: true, // If they are in the trash
            index : { [Op.gt]: index }         // And their index > the card to restore
          },
          transaction: restoreCardTransaction
        });
        // db.query('UPDATE card SET index = index - 1 WHERE user_id = $1 AND is_deleted = TRUE AND index > $2;', [userId, index]);

        // Get the highest index of the user's card in the same category in the dashboard
        const highestIndexInDashboard = await Card.max('index', {
          where: { 
            userId, 
            isDeleted: false, 
            category 
          },
          transaction: restoreCardTransaction
        });
        // db.query('SELECT MAX(index) FROM card WHERE user_id = $1 AND is_deleted = FALSE AND category = $2;', [userId, category]);

        // New card index will be 0 if no card is currently in the dashboard in this category
        let newIndex = 0;
        if (highestIndexInDashboard != null) { // Restore the card after the highest index
          newIndex = highestIndexInDashboard + 1; 
        }

        await cardToRestore.update({ isDeleted: false, index: newIndex }, {
          transaction: restoreCardTransaction
        });
        // db.query('UPDATE card SET is_deleted = FALSE, index = $1 WHERE id = $2 AND user_id = $3;', [newIndex, id, userId]);
        
        await restoreCardTransaction.commit();   // Execute the whole transaction

        res.status(200).json(cardToRestore);

      } catch(error) {
        await restoreCardTransaction.rollback();   // Cancel the whole transaction
        throw new Error('Impossible de restaurer la fiche depuis la corbeille');
      }
    
    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteCard(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.body;

      const card = await Card.findOne({ where : { id, userId } });
      if (!card)
        return res.status(404).json("Impossible de trouver la fiche dans la base");

      const cardIsDeleted = await card.destroy();
      if (!cardIsDeleted)
        throw new Error("Impossible de supprimer la fiche");

      res.status(200).json(id);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

}

export default cardController;