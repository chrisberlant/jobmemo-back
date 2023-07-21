import { Router } from 'express'
const router = Router();
import userController from './controllers/userController.js';
import cardController from './controllers/cardController.js';
import jwtMiddleware from './middlewares/jwtMidleware.js';

router.get('/', (req, res) => res.send("Hello world"));

router.get('/users', userController.getAllUsers);

router.post('/login', userController.login);
router.post('/register', userController.register);
router.patch('/modifyUserInfos', jwtMiddleware, userController.modifyUserInfos);

router.get('/userCards/', jwtMiddleware, cardController.getDashboardCards);
router.get('/card/:cardId', jwtMiddleware, cardController.getCardById);


export default router;