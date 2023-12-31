import { Document } from "../models/index.js";
import path from 'path';

const documentController = {

  async getAllDocuments(req, res) {
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

  async getDocumentById(req, res) {
    try {
      const userId = req.user.id;
      const id = req.params.id;

      const document = await Document.findOne({ where : { id, userId } });
      if (!document)
        return res.status(404).json (`Le document avec l'id ${id} n'existe pas`);

      res.status(200).json(document);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async createNewDocument(req, res) {
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

  async modifyDocument(req, res) {
    try {
      const userId = req.user.id;
      const { id, title, type } = req.body;

      const document = await Document.findOne({ where : { id, userId } });

      if (!document)
        return res.status(404).json("Impossible de trouver le contact dans la base");

      const documentIsModified = await document.update({ title, type });
      if (!documentIsModified)
        throw new Error('Impossible de modifier le document');

      res.status(200).json(document);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteDocument(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.body;
      const document = await Document.findOne({ where: { id, userId } });
      if (!document)
        return res.status(404).json("Impossible de trouver le document dans la base");

      const documentIsDeleted = await document.destroy();
      if (!documentIsDeleted)
        throw new Error('Impossible de supprimer le document');

      res.status(200).json('document supprimé');

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async downloadDocumentById(req, res) {
    try {
      const userId = req.user.id;
      const id = req.params.id;

      const document = await Document.findOne({ where : { id, userId } });
      if (!document)
        return res.status(404).json (`Le document avec l'id ${id} n'existe pas`);

      const documentUrl = document.url;

      const documentPath = path.join('uploads', documentUrl);
      console.log(documentPath);

      res.download(documentPath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json(`Erreur lors du téléchargement du document : ${err.message}`);
        }
      });

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
}


export default documentController;