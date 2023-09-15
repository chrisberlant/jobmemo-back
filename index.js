import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import router from './app/router.js';
import cors from 'cors';
import middleware404 from './app/middlewares/middleware404.js';
import multer from 'multer';

const app = express();
app.use(cookieParser());
app.use(express.static('public'));

app.use(cors());
app.use(express.json());
const mutipartParser = multer();
app.use(mutipartParser.none());


app.use(router);

app.use(middleware404);

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Listening on <http://localhost>:${port}`);
});