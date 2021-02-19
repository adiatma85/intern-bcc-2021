const userValidator = require('./user.validator')
const tweetValidator = require('./tweet.validator')

module.exports = {
    // User validation
    'user' : userValidator,

    // Tweet validation
    'tweet': tweetValidator
}
