//VALIDATION
const Joi = require('@hapi/joi');

// Register Validation

const resgisterValidation = data =>{
    const schema =Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required(),
        phone: Joi.number()
        .integer()
        .min(1000000)
        .max(100000000)
    });
    return schema.validate(data)
}
const loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
}

module.exports.resgisterValidation = resgisterValidation;
module.exports.loginValidation = loginValidation;