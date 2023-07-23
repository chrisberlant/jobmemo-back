import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});





const dataValidation = (data, schema) => {
    const { error } = schema.validate(data);

    if (error) {
        return false;
    }
    return true;
};

export { dataValidation, loginSchema };