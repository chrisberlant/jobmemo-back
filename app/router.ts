import { Router, Request, Response } from 'express'
const router = Router();
import userController from './controllers/userController';
import cardController from './controllers/cardController';

router.get('/', (req: Request, res: Response) => res.send("Hello world"));

router.get('/users', userController.getAllUsers);

router.post('/login', userController.login);

router.get('/userCards/:userId', cardController.getAllUserCards);

export default router;