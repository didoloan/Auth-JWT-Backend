const Joi = require('@hapi/joi');

const registerValid = Joi.object({
    email: Joi.string().email().required(),
    fname: Joi.string().max(50).required(),
    lname: Joi.string().max(50).required(),
    dob: Joi.date().iso().required(),
    password: Joi.string().alphanum().required(),
    interests: Joi.array(),
    hobbies: Joi.array()
})

const loginValid = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required()
})

module.exports = { registerValid, loginValid }