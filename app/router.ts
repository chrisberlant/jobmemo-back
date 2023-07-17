import { Router, Request, Response } from 'express'
const router = Router();
import userController from './controllers/userController';

router.get('/', (req: Request, res: Response) => res.send("Hello world"));

router.get('/users', userController.getAllUsers);

router.post('/login', userController.login);

export default router;