import { Router } from 'express'
const router = Router();
import userController from './controllers/userController.js';
import cardController from './controllers/cardController.js';
import jwtMiddleware from './middlewares/jwtMidleware.js';


/* ------------- TESTS ROUTES ------------- */
router.get('/', (req, res) => res.send("Hello world"));
router.get('/users', userController.getAllUsers);

/* ------------- USER/AUTH ROUTES ------------- */
router.post('/login', userController.login);
router.post('/register', userController.register);
router.patch('/modifyUserInfos', jwtMiddleware, userController.modifyUserInfos);

/* ------------- CARDS ROUTES ------------- */
router.get('/userCards/', jwtMiddleware, cardController.getDashboardCards);
router.get('/card/:cardId', jwtMiddleware, cardController.getCardById);
router.post('/createNewCard', jwtMiddleware, cardController.createNewCard);
router.patch('/modifyCardLocation', jwtMiddleware, cardController.modifyCardLocation);
router.patch('/trashOrRestoreCard', jwtMiddleware, cardController.trashOrRestoreCard);


export default router;