import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import router from './app/router.js';
import cors from 'cors';
import middleware404 from './app/middlewares/middleware404.js';

const app = express();
app.use(cookieParser());
app.use(express.static('public'));

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Authorize credentials (used for cookies)
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

app.use(middleware404);

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Listening on <http://localhost>:${port}`);
});