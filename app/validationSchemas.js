import Joi from "joi";

// User validation schemas

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).options({ stripUnknown: true });   // This allows to ignore any unknown attributes sent by the user

export const userRegistrationSchema = Joi.object({
  id: Joi.any().forbidden(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required()
}).options({ stripUnknown: true });

export const userModificationSchema = Joi.object({
  id: Joi.any().forbidden(),
  email: Joi.string().email(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  avatarUrl: Joi.string().uri(),
  address: Joi.string()
}).options({ stripUnknown: true });


// Card validation schemas

export const cardCreationSchema = Joi.object({
  id: Joi.any().forbidden(),
  title: Joi.string(),
  category: Joi.string().valid('"Mes offres"', '"Mes candidatures"', '"Mes relances"', '"Mes entretiens"'),
  index: Joi.number().min(0),
  enterpriseName : Joi.string(),
  enterpriseActivity : Joi.string(),
  contractType: Joi.string().valid('CDI', 'CDD', 'Alternance', 'Autre'),
  description: Joi.string(),
  offerUrl: Joi.string().uri(),
  location: Joi.string(),
  salary: Joi.string(),
  jobTitle: Joi.string(),
  notation: Joi.number(),
  color: Joi.string(),
  notes: Joi.string(),
  reminder: Joi.date(),
  logoUrl: Joi.string().uri(),
  userId: Joi.any().forbidden()
}).options({ stripUnknown: true });

export const cardModificationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
  index: Joi.any().forbidden(),
  enterpriseName : Joi.string(),
  enterpriseActivity : Joi.string(),
  contractType: Joi.string().valid('CDI', 'CDD', 'Alternance', 'Autre'),
  description: Joi.string(),
  offerUrl: Joi.string().uri(),
  location: Joi.string(),
  salary: Joi.string(),
  jobTitle: Joi.string(),
  notation: Joi.number(),
  color: Joi.string(),
  isDeleted: Joi.any().forbidden(),
  notes: Joi.string(),
  reminder: Joi.date(),
  logoUrl: Joi.string().uri(),
  userId: Joi.any().forbidden()
}).options({ stripUnknown: true });

export const cardSelectionSchema = Joi.object({
  id: Joi.string().uuid().required(),
}).options({ stripUnknown: true });

export const cardMovingSchema = Joi.object({
  id: Joi.string().uuid().required(),
  index: Joi.number().min(0),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
  userId: Joi.any().forbidden(),
}).options({ stripUnknown: true });


// Contact validation schemas

export const contactCreationSchema = Joi.object({
  id: Joi.any().forbidden(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  occupation: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^(\+|\d{1,3})([\s.-]?\d+)+$/),
  linkedinProfile: Joi.string().uri(),
  enterprise: Joi.string(),
  comments: Joi.string(),
  color: Joi.string(),
  userId: Joi.any().forbidden()
}).options({ stripUnknown: true });

export const contactModificationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  occupation: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^(\+|\d{1,3})([\s.-]?\d+)+$/),
  linkedinProfile: Joi.string().uri(),
  enterprise: Joi.string(),
  comments: Joi.string(),
  color: Joi.string(),
  userId: Joi.any().forbidden()
}).options({ stripUnknown: true });

export const contactSelectionSchema = Joi.object({
  id: Joi.string().uuid().required()
}).options({ stripUnknown: true });


// Function used to validate the data types according to data provided by the user and a validation schema
export const dataValidation = (data, schema) => {
    const { error } = schema.validate(data);

    if (error) {
        return error.details[0].message;
    }
    return null;
};