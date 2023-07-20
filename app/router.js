import { Router } from 'express'
const router = Router();
import userController from './controllers/userController.js';
import cardController from './controllers/cardController.js';
import jwtMiddleware from './middlewares/middlewareCheckJwt.js';

router.get('/', (req, res) => res.send("Hello world"));

router.get('/users', userController.getAllUsers);

router.post('/login', userController.login);

router.get('/userCards/', jwtMiddleware, cardController.getAllUserCards);

router.post('/register', userController.register);

export default router;