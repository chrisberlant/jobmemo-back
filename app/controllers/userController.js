import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { dataIsNotValid, loginSchema, registerSchema } from '../validationSchemas.js';

const userController = {

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();

      if (!users) {
        res.status(404).json("Can't find users");
      } else {
        res.json(users);
      }

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    const dataError = dataIsNotValid(req.body, loginSchema) // Check if credentials provided are the types of data required
    if (dataError) {
      return res.status(401).json(dataError.details[0].message);  // Send the error details
    }

    try {

      const userSearched = await User.findOne({ where:    // Find user in DB
        { email: email.toLowerCase() }
      });

      if (!userSearched) {          // If user does not exist in the DB
        res.status(404).json(`User ${email} does not exist`);
      } else {
        // TODO : LES PASSWORD DOIVENT ETRE CHIFFRÉS (bcrypt.compare)
        if (userSearched.password === password) {
          const user = userSearched.get({ plain: true});    // Create a copy of the sequelize object with only the infos needed and removing the password
          delete user.password;
          //On déclare une variable qui contiendra notre token qu'on enverra vers le front(jwt.sign({nosInfos}, SECRET_KEY))
          //TODO : VERIFIER LES INFOS ESSENTIELLES (id user, email ?);
          const token = jwt.sign({ user }, process.env.SECRET_KEY);
          res.status(200).json({ user, token });
        } else {
          res.status(401).json('Incorrect password');
        }
      }

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

    async register(req, res) {
      const { email, password, firstName, lastName } = req.body;

      // TODO chiffrement password

      const dataError = dataIsNotValid(req.body, registerSchema) // Check if credentials provided are the types of data required
      if (dataError) {
        return res.status(400).json(dataError.details[0].message);  // Send the error details
      }

      try {

        const alreadyExistingUser = await User.findOne({ where:    // Check if user already exists
          { email: email.toLowerCase() }
        });

        if (alreadyExistingUser) {
          res.status(401).json('This email address is already in use');
        } else {
          const user = await User.create({ email, password, firstName, lastName });
          res.status(201).json(`User ${user} has been created`);
        };

      } catch(error) {
        console.error(error);
        res.status(500).json(error);
      }
    },

    async modifyUserInfos(req, res) {
      const userId = req.user.user.id;
      const { email, firstName, lastName, address } = req.body;

      try {

        const user = await User.findByPk(userId);

        if (!user) {
          res.status(404).json("Impossible de trouver l'utilisateur dans la base");
        } else {
          if (email) user.email = email;
          if (firstName) user.firstName = firstName;
          if (lastName) user.lastName = lastName;
          if (address) user.address = address;

          const userModified = await user.save();
          if (!userModified) {
            throw new Error("Impossible de modifier les infos utilisateur");
          }

          res.status(200).json(user);
        }

      } catch(error) {
        console.error(error);
        res.status(500).json(error);
      }
    }

}

export default userController;