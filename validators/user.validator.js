const joi = require('joi')

// sub-schema
const name = joi.string().regex(/^[a-z A-Z]+$/)
const username = joi.string().regex(/^[0-9 @-Z a-z]+$/)
const password = joi.string().min(8).strict()

// Schema Validation for register
const registerSchema = joi.object().keys({
    firstname: name.required(),
    lastname: name.required(),
    username: username.required(),
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

// Schema Validation for login
const loginSchema = joi.object().keys({
    username: username.required(),
    password: password.required(),
})

// Schema Validation for update profile
const updateProfileSchema = joi.object().keys({
    username: username.empty(''),
    firstname: name.empty(''),
    lastname: name.empty(''),
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

module.exports = {
    'register': registerSchema,
    'login': loginSchema,
    'update': updateProfileSchema
}
