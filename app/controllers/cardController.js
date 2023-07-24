import { Card } from '../models/index.js';
import { dataValidation, cardCreationSchema } from '../validationSchemas.js';

const cardController = {

    async getDashboardCards(req, res) {
      try {
          const userId = req.user.user.id;
          const cards = await Card.findAll({ where: { userId } });

          if (!cards) {
            res.status(404).json("Can't find cards");
          } else {
            res.status(200).json(cards);
          }

        } catch(error) {
          console.error(error);
          res.status(500).json(error);
        }
      },

      async getCardById(req, res) {
        try {
          const userId = req.user.user.id;
          const cardId = req.params.cardId;
          const card = await Card.findOne({ where : { 'id': cardId, 'userId': userId} });

          if (!card) {
            res.status(404).json (`La fiche avec l'id ${cardId} n'existe pas`);
          } else {
            res.status(200).json(card);
          }

        } catch(error) {
          console.error(error);
          res.status(500).json(error);
        }
      },

      async modifyCardLocation(req, res) {
        try {
          const cardToModify = req.body;
          const { id, index, category } = cardToModify;
          const card = await Card.findByPk(id);

          if (!card) {
            res.status(404).json("Impossible de trouver la carte dans la base");
          } else {
            for (const key in cardToModify) {
              if (key) card[key] = cardToModify[key];
            }

            const cardModified = await card.save();
            if (!cardModified) {
              throw new Error("Impossible de modifier la carte");
            }

            res.status(200).json(card);
          }

        } catch(error) {
          console.error(error);
          res.status(500).json(error);
        }
      },

      async createNewCard (req, res) {
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

          const newCard = await Card.create({ ...newCardInfos, userId });
          if (!newCard) {
            throw new Error("Impossible de créer la carte");
          }

          res.status(201).json(newCard);

        } catch(error) {
          console.error(error);
          res.status(500).json(error);
        }
      }

}

export default cardController;