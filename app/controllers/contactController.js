import { Contact } from "../models/index.js";
import { dataValidation, contactCreationSchema, contactModificationSchema } from "../validationSchemas.js";

const contactController = {

  async getUserContacts(req, res) {
    try {
      const userId = req.user.user.id;
      const contacts = await Contact.findAll({ where: { userId } });

      if (!contacts) {
        return res.status(404).json("Can't find contacts");
      }

      res.status(200).json(contacts);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },



  async createNewContact(req, res) {
    try {
      const newContactInfos = req.body;
      const userId = req.user.user.id;

      const dataError = dataValidation(newContactInfos, contactCreationSchema);
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const newContact = await Contact.create({ ...newContactInfos, userId });

      if (!newContact) {
        throw new Error("Impossible de créer le contact");
      }

      res.status(201).json(newContact);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async modifyContact(req, res) {
    try {
      const { id, ...newInfos } = req.body;
      const userId = req.user.user.id;

      const dataError = dataValidation(req.body, contactModificationSchema);
      if (dataError) {
        return res.status(400).json(dataError);
      }

      const contact = await Contact.findOne({ where : { id, userId } });

      if (!contact) {
        return res.status(404).json("Impossible de trouver le contact dans la base");
      }

      const contactIsModified = await contact.update(newInfos);
      if (!contactIsModified) {
        throw new Error("Impossible de modifier le contact");
      }

      res.status(200).json(contact);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
}

export default contactController;