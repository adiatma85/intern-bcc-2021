const joi = require('joi')

// sub schema
const stringField = joi.string()

// Create Validator Schema
const createSchema = joi.object().keys({
    title: stringField.required(),
    content: stringField.required()
});

// Update Validator Schema
const updateSchema = joi.object().keys({
    title: stringField.empty(''),
    content: stringField.empty('')
})

module.exports = {
    'create': createSchema,
    'update': updateSchema
}