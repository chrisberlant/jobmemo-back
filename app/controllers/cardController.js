import { Card } from '../models/index.js';

const cardController = {

    async getAllUserCards(req, res) {
        const userId = req.params.userId;

        try {
          const cards = await Card.findAll({ where : {'user_id' : userId}});

          if (!cards) {
            res.status(404).json("Can't find cards");
          } else {
            res.status(200).json(cards);
          }

        } catch (error) {
          console.trace(error);
          res.status(500).json(error);
        }

      },

}

export default cardController;