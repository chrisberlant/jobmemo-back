import { User } from '../models/index.js';
import { Request, Response } from 'express';
import * as EmailValidator from 'email-validator';


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

    if (!(email && password)) {
      res.status(401).json('Email or password not defined');
    } else if (!EmailValidator.validate(email))  { // Checking if user input is email type
        res.status(400).json('Invalid email format');
    } else {

      try {

        const user = await User.findOne({ where:    // Find user in DB
          { email: email.toLowerCase() }
        });

        if (!user) {          // If user does not exist in the DB
          res.status(404).json(`User ${email} does not exist`);
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
  },

    async register(req: Request, res: Response) {
      const { email, password, confirm_password, first_name, last_name } = req.body;

      if (!(email && password && confirm_password && first_name && last_name)) {
        res.status(400).json('Every input must be completed');
      } else if (password !== confirm_password) {
        res.status(400).json('The password and its confirmation are different');
      } else if (!EmailValidator.validate(email)) {
        res.status(400).json('Invalid email format');
      } else {

        try {

          const alreadyExistingUser = await User.findOne({ where:    // Check if user already exists
            { email: email.toLowerCase() }
          });

          if (alreadyExistingUser) {
            res.status(409).json('This email address is already in use');
          } else {
            const user = await User.create({email, password, first_name, last_name});
            res.status(201).json(`User ${user} has been created`);
          };

        } catch(error) {
          console.trace(error);
          res.status(500).json(error);
        }

      }

    }

}

export default userController;