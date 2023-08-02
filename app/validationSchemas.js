import Joi from "joi";

// Schema used to select anything using its id
export const selectionSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

// User validation schemas

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required()
});

export const userModificationSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  password: Joi.string().min(6),
  confirmPassword: Joi.string().valid(Joi.ref('password')),
  avatarUrl: Joi.string().uri(),
  address: Joi.string()
});


// Card validation schemas

export const cardCreationSchema = Joi.object({
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
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
});

export const cardModificationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
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
});

export const cardMovingSchema = Joi.object({
  id: Joi.string().uuid().required(),
  index: Joi.number().min(0),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
});


// Contact validation schemas

export const contactCreationSchema = Joi.object({
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  occupation: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^(\+|\d{1,3})([\s.-]?\d+)+$/),
  linkedinProfile: Joi.string().uri(),
  enterprise: Joi.string(),
  comments: Joi.string(),
  color: Joi.string(),
});

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
});