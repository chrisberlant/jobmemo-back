import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userController = {

  async login(req, res) {
    try {
      const credentials = req.body;
      const { email, password } = credentials;

      const userSearched = await User.findOne({ where:    // Find user in DB
        { email: email.toLowerCase() }
      });
      if (!userSearched) // If user cannot be found
        return res.status(401).json(`User ${email} does not exist`);

      // Hashing the password provided by the user to compare it with the one in the DB
      const passwordsMatch = await bcrypt.compare(password, userSearched.password);
      if (!passwordsMatch)
        return res.status(401).json("Email ou mot de passe incorrect");

      const user = userSearched.get({ plain: true });    // Create a copy of the sequelize object with only the infos needed
      delete user.password;       // removing the password before using the object

      //TODO : VERIFIER LES INFOS ESSENTIELLES (id user, email ?);
      // We set a variable containing the token that will be sent to the front-end
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
      const { email, password } = userToRegister;

      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing the password provided by the user

      const alreadyExistingUser = await User.findOne({ where: { email } }); // Check if user already exists
      if (alreadyExistingUser)
        return res.status(401).json("Une erreur s'est produite");

      const user = await User.create({ ...userToRegister, password: hashedPassword });
      if (!user)
        throw new Error("Impossible de créer l'utilisateur");

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
      const { password } = infosToModify;

      if (Object.keys(infosToModify).length === 0)  // If no data were provided by the user
        return res.status(400).json("Aucune information fournie");

      const user = await User.findByPk(userId);
      if (!user)
        return res.status(404).json("Impossible de trouver l'utilisateur dans la base");

      // TODO hashedPassword
      if (password) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        infosToModify.password = await bcrypt.hash(password, saltRounds);
      }

      const userIsModified = await user.update({ ...infosToModify });
      if (!userIsModified)
        throw new Error("Impossible de modifier les infos utilisateur");

      res.status(200).json(infosToModify);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.user.user.id;

      const user = await User.findByPk(userId);
      if (!user)
        return res.status(404).json("Impossible de trouver l'utilisateur dans la base");

      const userIsDeleted = await user.destroy();
      if (!userIsDeleted)
        throw new Error("Impossible de supprimer l'utilisateur");

      res.status(200).json('Utilisateur supprimé');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

}

export default userController;