import { User } from '../models';
import { Request, Response } from 'express';


const userController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();

      if (!users) {
        res.status(404).json('Cant find users');
      } else {
        res.json(users);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
}

export default userController;