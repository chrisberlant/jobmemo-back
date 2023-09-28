import { Router } from 'express';
import jwtMiddleware from './middlewares/jwtMidleware.js';
import upload from './middlewares/uploadMiddleware.js';
import userController from './controllers/userController.js';
import cardController from './controllers/cardController.js';
import contactController from './controllers/contactController.js';
import documentController from './controllers/documentController.js';
import dataValidation from './middlewares/dataValidationMiddleware.js';
import { selectionSchema, cardCreationSchema, cardModificationSchema, cardMovingSchema, contactCreationSchema,
    contactModificationSchema, userLoginSchema, userModificationSchema, userRegistrationSchema, passwordModificationSchema } from './validationSchemas.js';
    
const router = Router();

/* ------------- USER/AUTH ROUTES ------------- */
router.post('/login', upload.none(), dataValidation(userLoginSchema), userController.login);
router.post('/register', upload.none(), dataValidation(userRegistrationSchema), userController.register);
router.get('/getUserInfos', jwtMiddleware, userController.getUserInfos);
router.patch('/modifyUserInfos', jwtMiddleware, upload.none(), dataValidation(userModificationSchema), userController.modifyUserInfos);
router.patch('/modifyUserPassword', jwtMiddleware, upload.none(), dataValidation(passwordModificationSchema), userController.modifyUserPassword);
router.get('/logout', userController.logout);
router.delete('/deleteUser', jwtMiddleware, userController.deleteUser);

/* ------------- CARDS ROUTES ------------- */
router.get('/allCards/', jwtMiddleware, cardController.getAllCards);
router.get('/card/:id', jwtMiddleware, dataValidation(selectionSchema), cardController.getCardById);
router.post('/createNewCard', jwtMiddleware, upload.none(), dataValidation(cardCreationSchema), cardController.createNewCard);
router.patch('/modifyCard', jwtMiddleware, upload.none(), dataValidation(cardModificationSchema), cardController.modifyCard);
router.patch('/moveCard', jwtMiddleware, upload.none(), dataValidation(cardMovingSchema), cardController.moveCard);
router.patch('/sendCardToTrash', jwtMiddleware, upload.none(), dataValidation(selectionSchema), cardController.sendCardToTrash);
router.patch('/restoreCard', jwtMiddleware, upload.none(), dataValidation(selectionSchema), cardController.restoreCard);
router.delete('/deleteCard', jwtMiddleware, upload.none(), dataValidation(selectionSchema), cardController.deleteCard);

/* ------------- CONTACTS ROUTES ------------- */
router.get('/allContacts', jwtMiddleware, contactController.getUserContacts);
router.get('/contact/:id', jwtMiddleware, dataValidation(selectionSchema), contactController.getContactById);
router.post('/createNewContact', jwtMiddleware, upload.none(), dataValidation(contactCreationSchema), contactController.createNewContact);
router.patch('/modifyContact', jwtMiddleware, upload.none(), dataValidation(contactModificationSchema), contactController.modifyContact);
router.delete('/deleteContact', jwtMiddleware, upload.none(), dataValidation(selectionSchema), contactController.deleteContact);

/* ------------- DOCUMENTS ROUTES ------------- */
router.get('/allDocuments', jwtMiddleware, documentController.getUserDocuments);
router.post('/uploadNewDocument', jwtMiddleware, upload.single('file'), documentController.uploadNewDocument);

export default router;