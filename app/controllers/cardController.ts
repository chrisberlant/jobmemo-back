import { Card } from '../models/index.js';
import { Request, Response } from 'express';


const cardController = {

    async getAllUserCards(req: Request, res: Response) {
        const userId = req.params.userId;

        try {
          const cards = await Card.findAll({ where : {'user_id' : userId}});

          if (!cards) {
            res.status(404).json("Can't find cards");
          } else {
            res.json(cards);
          }

        } catch (error) {
          console.trace(error);
          res.status(500).json(error);
        }

      },



}

export default cardController;