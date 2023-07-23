import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import { dataValidation, loginSchema } from '../validationSchemas.js';

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

    if (!dataValidation(req.body, loginSchema)) {       // Check if credentials provided are the types of data required
      return res.status(401).json("Données de connexion invalides");
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
      const { email, password, confirmPassword, firstName, lastName } = req.body;

      // TODO chiffrement password

      if (!(email && password && confirmPassword && firstName && lastName)) {
        res.status(400).json('Every input must be completed');
      } else if (password !== confirmPassword) {
        res.status(400).json('The password and its confirmation are different');
      } else if (!EmailValidator.validate(email)) {
        res.status(400).json('Invalid email format');
      } else {

        try {

          const alreadyExistingUser = await User.findOne({ where:    // Check if user already exists
            { email: email.toLowerCase() }
          });

          if (alreadyExistingUser) {
            res.status(401).json('This email address is already in use');
          } else {
            const user = await User.create({email, password, firstName, lastName});
            res.status(201).json(`User ${user} has been created`);
          };

        } catch(error) {
          console.error(error);
          res.status(500).json(error);
        }

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

      }catch(error) {
        console.error(error);
        res.status(500).json(error);
      }
    }

}

export default userController;