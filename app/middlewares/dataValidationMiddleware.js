import xss from "xss";

// This middleware allows us to validate every data sent by the user
// We also sanitize the data here before sending it to the database
export const dataValidation = (schema) => (req, res, next) => {
    // We check here if user request is GET or any other type to either validate the req.params or the req.body
    const objectToValidate = req.method === 'GET' ? req.params : req.body;

    for (const key in objectToValidate) {       
        // Each value will be sanitized from malicious inserts
        objectToValidate[key] = xss(objectToValidate[key]);
        // Every empty value will be nulled
        if (objectToValidate[key].trim() === "") objectToValidate[key] = null;
    }

    const { error } = schema.validate(objectToValidate);

    // Joi returns an object with attribute "error" if the data didn't pass the validation schema
    if (error)          
        return res.status(400).json(error.details[0].message);

    next();
};

export default dataValidation;