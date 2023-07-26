import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { dataValidation, userLoginSchema, userRegistrationSchema, userModificationSchema } from '../validationSchemas.js';

const userController = {

  // Used as test only
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();

      if (!users) {
        return res.status(404).json("Can't find users");
      }

      res.status(200).json(users);

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async login(req, res) {
    try {
      const credentials = req.body;
      const { email, password } = credentials;

      const dataError = dataValidation(credentials, userLoginSchema); // Check if credentials provided are the types of data required
      if (dataError) {
        return res.status(400).json(dataError);  // Send the error details
      }

      const userSearched = await User.findOne({ where:    // Find user in DB
        { email: email.toLowerCase() }
      });
      if (!userSearched) {          // If user does not exist in the DB
        return res.status(404).json(`User ${email} does not exist`);
      }

      // TODO : LES PASSWORD DOIVENT ETRE CHIFFRÉS (bcrypt.compare)
      if (userSearched.password !== password) {
        return res.status(401).json('Incorrect password');
      }

      const user = userSearched.get({ plain: true});    // Create a copy of the sequelize object with only the infos needed and removing the password
      delete user.password;
      //On déclare une variable qui contiendra notre token qu'on enverra vers le front(jwt.sign({nosInfos}, SECRET_KEY))
      //TODO : VERIFIER LES INFOS ESSENTIELLES (id user, email ?);
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      res.status(200).json({ user, token });

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async register(req, res) {
    try {
      const userToRegister = req.body;
      const { email, password, confirmPassword } = userToRegister;

      // TODO chiffrement password

      const dataError = dataValidation(userToRegister, userRegistrationSchema);
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const alreadyExistingUser = await User.findOne({ where: { email } }); // Check if user already exists
      if (alreadyExistingUser) {
        return res.status(401).json('This email address is already in use');
      }

      const user = await User.create(userToRegister);
      res.status(201).json('User has been created');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async modifyUserInfos(req, res) {
    try {
      const userId = req.user.user.id;
      const infosToModify = req.body;

      if (Object.keys(infosToModify).length === 0) { // If no data were provided by the user
        return res.status(400).json("Aucune information fournie");
      }

      const dataError = dataValidation(infosToModify, userModificationSchema);
      if (dataError) {
        return res.status(400).json(dataError.details[0].message);  // Send the error details
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json("Impossible de trouver l'utilisateur dans la base");
      }

      const userIsModified = await user.update(infosToModify);
      if (!userIsModified) {
        throw new Error("Impossible de modifier les infos utilisateur");
      }

      res.status(200).json(user);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.user.user.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json("Impossible de trouver l'utilisateur dans la base");
      }

      const userDeleted = await user.destroy();
      if (!userDeleted) {
        throw new Error("Impossible de supprimer l'utilisateur");
      }

      res.status(200).json('Utilisateur supprimé');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

}

export default userController;