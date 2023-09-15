import { Router } from 'express'
const router = Router();
import jwtMiddleware from './middlewares/jwtMidleware.js';
import userController from './controllers/userController.js';
import cardController from './controllers/cardController.js';
import contactController from './controllers/contactController.js';
import documentController from './controllers/documentController.js';
import dataValidation from './middlewares/dataValidationMiddleware.js';
import { selectionSchema, cardCreationSchema, cardModificationSchema, cardMovingSchema, contactCreationSchema,
    contactModificationSchema, userLoginSchema, userModificationSchema, userRegistrationSchema } from './validationSchemas.js';

// Multer allows to handle form inputs as a body object, and files uploaded as a file object
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });

/* ------------- TESTS ROUTES ------------- */
router.get('/', (req, res) => res.send("Hello world"));

/* ------------- USER/AUTH ROUTES ------------- */
router.post('/login', dataValidation(userLoginSchema), userController.login);
router.post('/register', dataValidation(userRegistrationSchema), userController.register);
router.patch('/modifyUserInfos', jwtMiddleware, dataValidation(userModificationSchema), userController.modifyUserInfos);
router.get('/logout', userController.logout);
router.delete('/deleteUser', jwtMiddleware, userController.deleteUser);

/* ------------- CARDS ROUTES ------------- */
router.get('/userCards/', jwtMiddleware, cardController.getAllCards);
router.get('/card/:id', jwtMiddleware, dataValidation(selectionSchema), cardController.getCardById);
router.post('/createNewCard', jwtMiddleware, dataValidation(cardCreationSchema), cardController.createNewCard);
router.patch('/modifyCard', jwtMiddleware, dataValidation(cardModificationSchema), cardController.modifyCard);
router.patch('/moveCard', jwtMiddleware, dataValidation(cardMovingSchema), cardController.moveCard);
router.patch('/sendCardToTrash', jwtMiddleware, dataValidation(selectionSchema), cardController.sendCardToTrash);
router.patch('/restoreCard', jwtMiddleware, dataValidation(selectionSchema), cardController.restoreCard);
router.delete('/deleteCard', jwtMiddleware, dataValidation(selectionSchema), cardController.deleteCard);

/* ------------- CONTACTS ROUTES ------------- */
router.get('/allContacts', jwtMiddleware, contactController.getUserContacts);
router.get('/contact/:id', jwtMiddleware, dataValidation(selectionSchema), contactController.getContactById);
router.post('/createNewContact', jwtMiddleware, dataValidation(contactCreationSchema), contactController.createNewContact);
router.patch('/modifyContact', jwtMiddleware, dataValidation(contactModificationSchema), contactController.modifyContact);
router.delete('/deleteContact', jwtMiddleware, dataValidation(selectionSchema), contactController.deleteContact);

/* ------------- DOCUMENTS ROUTES ------------- */
// router.post('/uploadFile', jwtMiddleware, upload.single('file'), documentController.uploadFile);
router.get('/userDocuments', jwtMiddleware, documentController.getUserDocuments);

export default router;