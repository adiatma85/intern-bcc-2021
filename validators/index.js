const userValidator = require('./user.validator')
const tweetValidator = require('./tweet.validator')

module.exports = {
    // User validation
    '/user/register': userValidator.registerSchema,
    '/user/login': userValidator.loginSchema,
    '/user/update': userValidator.updateProfileSchema

    // Tweet validation
    '/tweet/create': tweetValidator.createSchema,
}
