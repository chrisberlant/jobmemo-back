import { User } from '../models/index.js';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


const userController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();

      if (!users) {
        res.status(404).json("Can't find users");
      } else {
        res.json(users);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // if (!email.isEmail()) { // Checking if user input is email type
    //   res.status(401).json('Invalid email format');
    // } else {
    if (email && password) {
      try {

        const user = await User.findOne({ where:    // Find user in DB
          { email: email }
        });

        if (!user) {
          res.status(401).json(`User ${email} does not exist`);
        } else {
            if (user.dataValues.password === password) {          // Check if passwords match
              res.status(200).json(`User ${user.dataValues.first_name} ${user.dataValues.last_name} connected`);
            } else {
              res.status(401).json('Incorrect password');
            }
        }

      } catch (error) {
        console.trace(error);
        res.status(500).json(error);
      }

    }
  }
}

export default userController;