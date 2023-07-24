import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required()
});

const modifyUserSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/),
  address: Joi.string()
});

const cardCreationSchema = Joi.object({
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens'),
  index: Joi.number(),
  enterpriseName : Joi.string().alphanum(),
  enterpriseActivity : Joi.string().alphanum(),
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
});



const dataValidation = (data, schema) => {
    const { error } = schema.validate(data);

    if (error) {
        return error.details[0].message;
    }
    return null;
};

export { dataValidation, loginSchema, registerSchema, modifyUserSchema, cardCreationSchema };