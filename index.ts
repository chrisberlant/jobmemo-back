import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
// const userMiddleware = require('./middlewares/user');
import router from './app/router';
import cors from 'cors';
import middleware404 from './app/middlewares/middleware404'

const app = express();
app.use(express.static('public'));

// On autorise tout le monde sur notre API
app.use(cors());
// On demande à Express d'extraire les données des requêtes POST
app.use(express.json());
const mutipartParser = multer();
app.use(mutipartParser.none());


// app.use(userMiddleware);

app.use(router);

app.use(middleware404);


const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Listening on <http://localhost>:${port}`);
});