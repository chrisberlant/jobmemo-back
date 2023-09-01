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
  address: Joi.string().allow('')
});


// Card validation schemas

export const cardCreationSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens').required(),
  enterpriseName : Joi.string().required(),
  enterpriseActivity : Joi.string().allow(''),
  contractType: Joi.string().valid('CDI', 'CDD', 'Alternance', 'Autre').required(),
  description: Joi.string().allow(''),
  offerUrl: Joi.string().uri().allow(''),
  location: Joi.string().allow(''),
  salary: Joi.string().allow(''),
  jobTitle: Joi.string().allow(''),
  notation: Joi.number(),
  color: Joi.string(),
  notes: Joi.string().allow(''),
  reminder: Joi.date().allow(''),
  logoUrl: Joi.string().uri().allow(''),
});

export const cardModificationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
  enterpriseName : Joi.string(),
  enterpriseActivity : Joi.string().allow(''),
  contractType: Joi.string().valid('CDI', 'CDD', 'Alternance', 'Autre'),
  description: Joi.string().allow(''),
  offerUrl: Joi.string().uri().allow(''),
  location: Joi.string().allow(''),
  salary: Joi.string().allow(''),
  jobTitle: Joi.string().allow(''),
  notation: Joi.number(),
  color: Joi.string(),
  notes: Joi.string().allow(''),
  reminder: Joi.date().allow(''),
  logoUrl: Joi.string().uri().allow(''),
});

export const cardMovingSchema = Joi.object({
  id: Joi.string().uuid().required(),
  index: Joi.number().min(0).required(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens').required(),
});


// Contact validation schemas

export const contactCreationSchema = Joi.object({
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  occupation: Joi.string().allow(''),
  email: Joi.string().email().allow(''),
  phone: Joi.string().regex(/^(\+|\d{1,3})([\s.-]?\d+)+$/).allow(''),
  linkedinProfile: Joi.string().uri().allow(''),
  enterprise: Joi.string().allow(''),
  comments: Joi.string().allow(''),
  color: Joi.string(),
});

export const contactModificationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  occupation: Joi.string().allow(''),
  email: Joi.string().email().allow(''),
  phone: Joi.string().regex(/^(\+|\d{1,3})([\s.-]?\d+)+$/).allow(''),
  linkedinProfile: Joi.string().uri().allow(''),
  enterprise: Joi.string().allow(''),
  comments: Joi.string().allow(''),
  color: Joi.string(),
});