import { Document } from "../models/index.js";

const documentController = {

  async getUserDocuments(req, res) {
    try {
      const userId = req.user.user.id;
      const documents = await Document.findAll({ where: { userId } });

      if (!documents) {
        return res.status(404).json("Can't find documents");
      }

      res.status(200).json(documents);

    } catch(error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async uploadFile(req,res) {
    console.log(req.body.title);
    console.log(req.file);
  }
}


export default documentController;