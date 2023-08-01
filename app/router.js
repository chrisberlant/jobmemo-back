import { Router } from 'express'
const router = Router();
import jwtMiddleware from './middlewares/jwtMidleware.js';
import userController from './controllers/userController.js';
import cardController from './controllers/cardController.js';
import contactController from './controllers/contactController.js';
import documentController from './controllers/documentController.js';
import dataValidation from './middlewares/dataValidationMiddleware.js';
import { cardCreationSchema, cardModificationSchema, cardMovingSchema, cardSelectionSchema, contactCreationSchema, contactModificationSchema,
    contactSelectionSchema, userLoginSchema, userModificationSchema, userRegistrationSchema } from './validationSchemas.js';

// Multer allows to handle form inputs as a body object, and files uploaded as a file object
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });

/* ------------- TESTS ROUTES ------------- */
router.get('/', (req, res) => res.send("Hello world"));
router.get('/users', userController.getAllUsers);

/* ------------- USER/AUTH ROUTES ------------- */
router.post('/login', dataValidation(userLoginSchema), userController.login);
router.post('/register', dataValidation(userRegistrationSchema), userController.register);
router.patch('/modifyUserInfos', jwtMiddleware, dataValidation(userModificationSchema), userController.modifyUserInfos);
router.delete('/deleteUser', jwtMiddleware, userController.deleteUser);

/* ------------- CARDS ROUTES ------------- */
router.get('/userCards/', jwtMiddleware, cardController.getAllCards);
router.get('/card/:id', jwtMiddleware, dataValidation(cardSelectionSchema), cardController.getCardById);
router.post('/createNewCard', jwtMiddleware, dataValidation(cardCreationSchema), cardController.createNewCard);
router.patch('/modifyCard', jwtMiddleware, dataValidation(cardModificationSchema), cardController.modifyCard);
router.patch('/moveCard', jwtMiddleware, dataValidation(cardMovingSchema), cardController.moveCard);
router.patch('/trashOrRestoreCard', jwtMiddleware, dataValidation(cardSelectionSchema), cardController.trashOrRestoreCard);
router.delete('/deleteCard', jwtMiddleware, dataValidation(cardSelectionSchema), cardController.deleteCard);

/* ------------- CONTACTS ROUTES ------------- */
router.get('userContacts', jwtMiddleware, contactController.getUserContacts);
router.post('/createNewContact', jwtMiddleware, dataValidation(contactCreationSchema), contactController.createNewContact);
router.patch('/modifyContact', jwtMiddleware, dataValidation(contactModificationSchema), contactController.modifyContact);
router.delete('/deleteContact', jwtMiddleware, dataValidation(contactSelectionSchema), contactController.deleteContact);

/* ------------- UPLOAD ROUTES ------------- */
// router.post('/uploadFile', jwtMiddleware, upload.single('file'), documentController.uploadFile);

export default router;