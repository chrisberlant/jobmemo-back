import { Contact } from "../models/index.js";

const contactController = {

  async getAllContacts(req, res) {
    try {
      const userId = req.user.id;

      const contacts = await Contact.findAll({ where: { userId } });
      if (!contacts)
        return res.status(404).json("Can't find contacts");

      res.status(200).json(contacts);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async getContactById(req, res) {
    try {
      const userId = req.user.id;
      const id = req.params.id;

      const contact = await Contact.findOne({ where : { id, userId } });
      if (!contact)
        return res.status(404).json (`Le contact avec l'id ${id} n'existe pas`);

      res.status(200).json(contact);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async createNewContact(req, res) {
    try {
      const userId = req.user.id;
      const newContactInfos = req.body;

      const newContact = await Contact.create({ ...newContactInfos, userId });

      if (!newContact)
        throw new Error("Impossible de créer le contact");

      res.status(201).json(newContact);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async modifyContact(req, res) {
    try {
      const userId = req.user.id;
      const { id, ...newInfos } = req.body;

      const contact = await Contact.findOne({ where : { id, userId } });

      if (!contact)
        return res.status(404).json("Impossible de trouver le contact dans la base");

      const contactIsModified = await contact.update({ ...newInfos });
      if (!contactIsModified)
        throw new Error('Impossible de modifier le contact');

      res.status(200).json(contact);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteContact(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.body;

      const contact = await Contact.findOne({ where: { id, userId } });
      if (!contact)
        return res.status(404).json("Impossible de trouver le contact dans la base");

      const contactIsDeleted = await contact.destroy();
      if (!contactIsDeleted)
        throw new Error('Impossible de supprimer le contact');

      res.status(200).json('Contact supprimé');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

}

export default contactController;