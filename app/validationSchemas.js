import Joi from "joi";

// User validation schemas

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).options({ stripUnknown: true });   // This allows to ignore any unknown attributes sent by the user

const userRegistrationSchema = Joi.object({
  id: Joi.any().forbidden(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required()
}).options({ stripUnknown: true });

const userModificationSchema = Joi.object({
  id: Joi.any().forbidden(),
  email: Joi.string().email(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  address: Joi.string()
}).options({ stripUnknown: true });


// Card validation schemas

const cardCreationSchema = Joi.object({
  id: Joi.any().forbidden(),
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
  index: Joi.number(),
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
  isDeleted: Joi.boolean(),
  notes: Joi.string(),
  reminder: Joi.date(),
  logoUrl: Joi.string().uri()
}).options({ stripUnknown: true });

const cardModificationSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
  index: Joi.number(),
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
  isDeleted: Joi.boolean(),
  notes: Joi.string(),
  reminder: Joi.date(),
  logoUrl: Joi.string().uri()
}).options({ stripUnknown: true });

const cardSelectionSchema = Joi.object({
  id: Joi.string().uuid().required()
}).options({ stripUnknown: true });

const cardMovingSchema = Joi.object({
  id: Joi.string().uuid().required(),
  index: Joi.number(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens')
}).options({ stripUnknown: true });


// Function used to validate the data types according to data provided by the user and a validation schema
const dataValidation = (data, schema) => {
    const { error } = schema.validate(data);

    if (error) {
        return error.details[0].message;
    }
    return null;
};

export { dataValidation, userLoginSchema, userRegistrationSchema, userModificationSchema, cardCreationSchema, cardSelectionSchema, cardMovingSchema, cardModificationSchema };