import { Card } from '../models/index.js';

const cardController = {

    async getDashboardCards(req, res) {
        const userId = req.user.user.id;

        try {
          const cards = await Card.findAll({ where: {'userId': userId}, attributes: ['id', 'title', 'enterpriseName', 'logoUrl', 'jobTitle', 'salary', 'location', 'category', 'notation', 'color', 'createdAt', 'index', 'isDeleted' ] });

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
        const cardId = req.params.cardId;
        const userId = req.user.user.id;

        try {
          const card = await Card.findOne({where : { 'id': cardId, 'userId': userId} });

          if (!card) {
            res.status(404).json (`La fiche avec l'id ${cardId} n'existe pas`);
          } else {
            res.status(200).json(card);
          }

        } catch(error) {
          console.error(error);
          res.status(500).json(error);
        }

      }

}

export default cardController;