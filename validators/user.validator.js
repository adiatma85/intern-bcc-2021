const joi = require('joi')

// sub-schema
const name = joi.string().regex(/^[a-zA-Z]+$/).required()
const username = joi.string().regex(/^[0-9@-Za-z]+$/).required()
const password = joi.string().min(8).required().strict()

// Schema Validation for register
const registerSchema = joi.object().keys({
    firstname: name,
    lastname: name,
    username: username,
    password: password,
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

// Schema Validation for login
const loginSchema = joi.object().keys({
    username: username,
    password: password,
})

// Schema Validation for update profile
const updateProfileSchema = joi.object().keys({
    username: username.empty(''),
    firstname: name.empty(''),
    lastname: name.empty(''),
    password: password,
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema
}
