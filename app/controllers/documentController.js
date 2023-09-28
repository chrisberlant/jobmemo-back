import { Document } from "../models/index.js";

const documentController = {

  async getUserDocuments(req, res) {
    try {
      const userId = req.user.id;

      const documents = await Document.findAll({ where: { userId } });
      if (!documents)
        return res.status(404).json("Impossible de trouver les documents");

      res.status(200).json(documents);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async uploadNewDocument(req, res) {
    try {
      const userId = req.user.id;
      const { title, type } = req.body;
      const url = req.file.filename;
      const newDocument = await Document.create({ title, type, url, userId });

      if (!newDocument)
        throw new Error("Impossible de créer le document");

      res.status(201).json(newDocument);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  }, 
}


export default documentController;