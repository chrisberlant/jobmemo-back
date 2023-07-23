import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  firstName: Joi.string().regex(/^[a-zA-Z]+$/).required(),
  lastName: Joi.string().regex(/^[a-zA-Z]+$/).required()
});





const dataIsNotValid = (data, schema) => {
    const { error } = schema.validate(data);

    if (error) {
        return error;
    }
    return null;
};

export { dataIsNotValid, loginSchema, registerSchema };