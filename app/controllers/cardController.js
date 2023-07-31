import { Card } from '../models/index.js';
import { Op } from 'sequelize';
import sequelize from './../sequelize-client.js';
import { dataValidation, cardCreationSchema, cardSelectionSchema, cardMovingSchema, cardModificationSchema } from '../validationSchemas.js';

const cardController = {

  async getAllCards(req, res) {
    try {
      const userId = req.user.user.id;

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
      const userId = req.user.user.id;
      const id = req.params.cardId;

      const dataError = dataValidation(id, cardSelectionSchema);
      if (dataError)
        return res.status(400).json(dataError);

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
      // We do not need to destructurate here
      // const { title, category, index, enterpriseName, enterpriseActivity, contractType, description,
      //   offerUrl, location, salary, jobTitle, notation, color, isDeleted, notes, reminder, logoUrl } = req.body;
      const newCardInfos = req.body;
      const userId = req.user.user.id;

      const dataError = dataValidation(newCardInfos, cardCreationSchema);
      if (dataError)
        return res.status(400).json(dataError);

      // New card is created according to the data provided by the user, and userId is set according to the request info containing the user id
      const newCard = await Card.create({ ...newCardInfos, userId });
      if (!newCard)
        throw new Error("Impossible de créer la fiche");

      res.status(201).json(newCard);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async modifyCard(req, res) {
    try {
      const { id, ...newInfos } = req.body;
      const userId = req.user.user.id;

      const dataError = dataValidation(req.body, cardModificationSchema);
      if (dataError)
        return res.status(400).json(dataError);

      const card = await Card.findOne({ where : { id, userId } });
      if (!card)
        return res.status(404).json("Impossible de trouver la fiche dans la base");

      const cardIsModified = await card.update(newInfos);
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
      const { id, index, category } = req.body;
      const userId = req.user.user.id;

      const dataError = dataValidation(req.body, cardMovingSchema);
      if (dataError)
        return res.status(400).json(dataError);

      const card = await Card.findOne({ where : { id, userId } });
      if (!card)
        return res.status(404).json("Impossible de trouver la fiche dans la base");

      // Get the original category and index of the moving card
      const oldCategory = card.category;
      const oldIndex = card.index;

      // Create a new sequelize transaction to optimize the amount of queries done to the DB
      // It allows us to cancel everything if one the operations failed, preventing index duplicates in the DB
      const indexChangesTransaction = await sequelize.transaction();

      try {
        await Card.increment({ index: -1 }, {   // Decrement index of the card
          where: {
            userId,
            category: oldCategory,   // If it belongs to the old category
            index : { [Op.gt]: oldIndex }         // And its index > the card's old index in the old category
          },
          transaction: indexChangesTransaction
        });

        await Card.increment({ index: 1 }, {   // Increment index of the card
          where: {
            userId,
            category,                // If it belongs to the new category
            index : { [Op.gte]: index }         // And its index >= the card's index in the new category
          },
          transaction: indexChangesTransaction
        });

        await card.update({ index, category }, { transaction: indexChangesTransaction });

        await indexChangesTransaction.commit();   // Execute the whole transaction

        res.status(200).json(card);

      } catch(error) {
        await indexChangesTransaction.rollback();   // Cancel the whole transaction
        throw new Error('Impossible de déplacer la fiche');
      }

      // Unoptimizd queries without transaction would be

      // const oldCategoryCards = await Card.findAll({ where : { userId, category: oldCategory,   // Get cards from the old category
      //   index : {
      //     [Op.gt]: oldIndex     // Every card with index > the index where the card was moved from
      //   }
      // } });

      // const newCategoryCards = await Card.findAll({ where : { userId, category,     // Get cards from the new category
      //   index : {
      //     [Op.gte]: index     // Every card with index >= the index where the card is moved
      //   }
      // } });

      // if (oldCategoryCards) {
      //   for (const card of oldCategoryCards) {        // Decrement the other cards' index in the old category
      //     card.index--;
      //     const indexChanged = await card.save();
      //     if (!indexChanged) throw new Error("Impossible de modifier l'index de toutes les fiches de l'ancienne catégorie");
      //   };
      // }

      // if (newCategoryCards) {
      //   for (const card of newCategoryCards) {      // Increment the other cards' index in the new category
      //     card.index++;
      //     const indexChanged = await card.save();
      //     if (!indexChanged) throw new Error("Impossible de modifier l'index de toutes les fiches de la nouvelle catégorie");
      //   };
      // }

      // const cardIsModified = await card.update({ index, category });
      // if (!cardIsModified) {
      //   throw new Error("Impossible de modifier l'emplacement de la fiche");
      // }

      // res.status(200).json(card);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async trashOrRestoreCard(req, res) {
    try {
      const { id } = req.body;
      const userId = req.user.user.id;

      const dataError = dataValidation(req.body, cardSelectionSchema);
      if (dataError)
        return res.status(400).json(dataError);

      const card = await Card.findOne({ where : { id, userId } });
      if (!card)
        return res.status(404).json("Impossible de trouver la fiche dans la base");

      card.isDeleted = !card.isDeleted;

      // When sending card to trash, assign a random index between 1000 and 9999
      // So when the card is restored, it will go directly to the end of the category without creating a duplicate index
      if (card.isDeleted)
        card.index = Math.floor(Math.random() * 9000) + 1000;

      const cardTrashedOrRestored = await card.save();
      if (!cardTrashedOrRestored && card.isDeleted === true) throw new Error("Impossible d'ajouter la fiche dans la corbeille");
      if (!cardTrashedOrRestored) throw new Error("Impossible de restaurer la fiche depuis la corbeille");

      res.status(200).json(card);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteCard(req, res) {
    try {
      const { id } = req.body;
      const userId = req.user.user.id;

      const dataError = dataValidation(req.body, cardSelectionSchema);
      if (dataError)
        return res.status(400).json(dataError);

      const card = await Card.findOne({ where : { id, userId } });
      if (!card)
        return res.status(404).json("Impossible de trouver la fiche dans la base");


      const cardDeleted = await card.destroy();
      if (!cardDeleted)
        throw new Error("Impossible de supprimer la fiche");

      res.status(200).json('Fiche supprimée');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

}

export default cardController;