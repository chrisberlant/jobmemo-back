import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
// const userMiddleware = require('./middlewares/user');
// const router = require("./app/router");
import cors from 'cors';
// const middleware404 = require("./src/middlewares/middleware404");

const app = express();
app.use(express.static('public'));

// On autorise tout le monde sur notre API
app.use(cors());
// On demande à Express d'extraire les données des requêtes POST
app.use(express.json());


// app.use(userMiddleware);

// app.use(router);

// app.use(middleware404);

app.get('/', (req : Request, res: Response) => {
    res.send("Hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Listening on <http://localhost>:${port}`);
});