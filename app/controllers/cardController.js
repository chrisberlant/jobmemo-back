import { Card } from '../models/index.js';

const cardController = {

    async getAllUserCards(req, res) {
        const userId = req.user.user.id;
        console.log("requete dans le controller", req.user);
        try {
          const cards = await Card.findAll({ where : {'userId' : userId}});

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