import { Card } from '../models/index.js';
import { dataValidation, cardCreationSchema, cardSelectionSchema, cardMovingSchema, cardModificationSchema } from '../validationSchemas.js';

const cardController = {

  async getAllCards(req, res) {
    try {
      const userId = req.user.user.id;
      const cards = await Card.findAll({ where: { userId } });

      if (!cards) {
        return res.status(404).json("Can't find cards");
      }

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
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const card = await Card.findOne({ where : { id, userId },
        include: ['contacts', 'documents'] });

      if (!card) {
        return res.status(404).json (`La fiche avec l'id ${id} n'existe pas`);
      }

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
      if (dataError) {
        return res.status(400).json(dataError);
      }

      // New card is created according to the data provided by the user, and userId is set according to the request info containing the user id
      const newCard = await Card.create({ ...newCardInfos, userId });

      if (!newCard) {
        throw new Error("Impossible de créer la carte");
      }

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
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const card = await Card.findOne({ where : { id, userId } });

      if (!card) {
        return res.status(404).json("Impossible de trouver la carte dans la base");
      }

      const cardIsModified = await card.update(newInfos);

      if (!cardIsModified) {
        throw new Error("Impossible de modifier la carte");
      }

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
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const card = await Card.findOne({ where : { id, userId } });

      if (!card) {
        return res.status(404).json("Impossible de trouver la carte dans la base");
      }

      const cardIsModified = await card.update({ index, category });
      if (!cardIsModified) {
        throw new Error("Impossible de modifier l'emplacement de la carte");
      }

      res.status(200).json(card);

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
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const card = await Card.findOne({ where : { id, userId } });

      if (!card) {
        return res.status(404).json("Impossible de trouver la carte dans la base");
      }

      card.isDeleted = !card.isDeleted;

      const cardTrashed = await card.save();
      if (!cardTrashed && card.isDeleted === true) {
        throw new Error("Impossible d'ajouter la carte dans la corbeille");
      }
      if (!cardTrashed) {
        throw new Error("Impossible de restaurer la carte depuis la corbeille");
      }

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
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const card = await Card.findOne({ where : { id, userId } });

      if (!card) {
        return res.status(404).json("Impossible de trouver la carte dans la base");
      }

      const cardDeleted = await card.destroy();
      if (!cardDeleted) {
        throw new Error("Impossible de supprimer la carte");
      }

      res.status(200).json('Carte supprimée');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

}

export default cardController;