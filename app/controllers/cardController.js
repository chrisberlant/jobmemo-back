import { Card } from '../models/index.js';
import { Op } from 'sequelize';
import sequelize from './../sequelize-client.js';

const cardController = {

  async getAllCards(req, res) {
    try {
      const userId = req.user.id;

      const cards = await Card.findAll({ where: { userId } });
      if (!cards)
        return res.status(404).json("Can't find cards");

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
        
        // New card index will be 0 if no card is currently in the trash
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

        // If the card changed category
        if (oldCategory !== newCategory) {
        // We will change the indexes of the old category's cards
          await Card.decrement({ index: 1 }, {   // Decrement index of the cards
            where: {
              userId,
              category: oldCategory,   // If they belong to the old category
              isDeleted: false, // If they are on the dashboard
              index : { [Op.gt]: oldIndex }         // And their index > the moving card's old index in the old category
            },
            transaction: indexChangesTransaction
          });
        }

        // Either way we will change the indexes of the new (or same) category's cards
        await Card.increment({ index: 1 }, {   // Increment index of the cards
          where: {
            userId,
            category: newCategory,                // If they belong to the new category
            isDeleted: false,
            index : { [Op.gte]: newCardIndex }         // And their index >= the moving card's index in the new category
          },
          transaction: indexChangesTransaction
        });


        // Change the index and category (if needed) of the moving card
        await card.update({ index: newCardIndex, category: newCategory }, {
          transaction: indexChangesTransaction
        });

        await indexChangesTransaction.commit();   // Execute the whole transaction
        res.status(200).json({ card, oldCategory, oldIndex });
        
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
      if (!cardToTrash)
        return res.status(404).json("Impossible de trouver la fiche dans le dashboard");

      const index = cardToTrash.index;
      const category = cardToTrash.category;
      
      const sendToTrashTransaction = await sequelize.transaction();
      
      try {
        // We will decrement the indexes of the cards belonging to the category of the trashed card
        await Card.decrement({ index: 1 }, {   // Decrement index of the cards
          where: {
            userId,
            isDeleted: false, // If they are not in the trash aswell
            category,   // If they belong to the same category
            index : { [Op.gt]: index }         // And their index > the card to send to trash
          },
          transaction: sendToTrashTransaction
        });

        // Get the highest index of the user's trashed cards
        const highestIndexInTrash = await Card.max('index', {
          where: { 
            userId,
            isDeleted: true 
          },
          transaction: sendToTrashTransaction
        });

        // New card index will be 0 if no card is currently in the trash
        let newIndex = 0;
        if (highestIndexInTrash != null) {
          newIndex = highestIndexInTrash + 1;
        }

        await cardToTrash.update({ isDeleted: true, index: newIndex }, {
          transaction: sendToTrashTransaction
        });
        
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

        // Get the highest index of the user's card in the same category in the dashboard
        const highestIndexInDashboard = await Card.max('index', {
          where: { 
            userId, 
            isDeleted: false, 
            category 
          },
          transaction: restoreCardTransaction
        });

        // New card index will be 0 if no card is currently in the dashboard in this category
        let newIndex = 0;
        if (highestIndexInDashboard != null) { // Restore the card after the highest index
          newIndex = highestIndexInDashboard + 1; 
        }

        await cardToRestore.update({ isDeleted: false, index: newIndex }, {
          transaction: restoreCardTransaction
        });
        
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

      res.status(200).json('Fiche supprimée');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

}

export default cardController;