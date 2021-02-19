const joi = require('joi')

// sub schema
const stringField = joi.string().strict().empty('')

// Create Validator Schema
const createSchema = joi.object().keys({
    title: stringField.required(),
    content: stringField.required()
});

// Update Validator Schema
const updateSchema = joi.object().keys({
    title: stringField,
    content: stringField
})

module.exports = {
    createSchema,
    updateSchema
}