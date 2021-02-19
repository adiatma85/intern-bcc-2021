const _ = require('lodash')
const Schemas = require('../validators')
const useJoiError = process.env.USE_JOI_ERROR

function joiValidator(req, res, next) {

    const _supportMethods = ['post', 'put']

    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    }

    let route = req.originalUrl.split('/')
    route.splice(0, 1)
    const method = req.method.toLowerCase()
    

    if (_.includes(_supportMethods, method) && _.hasIn(Schemas, route)) {
        const _schema = _.get(Schemas, route)

        if (_schema) {
            const { value, error } = _schema.validate(req.body, _validationOptions)

            if (error) {
                const JoiError = {
                    success: 'false',
                    error: {
                        // Fetch
                        details: _.map(error.details, ({message, type}) => ({
                            message: message.replace(/['"]/g, ''),
                            type
                        }))
                    }
                };

                const customError = {
                    status: 'failed',
                    error: 'Invalid request data. Please review request and try again.'
                }
                return res.status(422).json(useJoiError ? JoiError : customError)
            } else {
                req.body = value
                return next()
            }
        }
    }
    return next()
}

module.exports = joiValidator