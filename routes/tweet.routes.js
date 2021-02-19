const tweet = require('../controller/tweet.controller')
const router = require('express').Router();
const jwtMiddleware = require('../middlewares/jwtAuth')
const joiMiddleware = require('../middlewares/joiValidator')

// List of all tweet
router.get("/", tweet.findAll);

// Create a tweet
router.post("/create", jwtMiddleware, joiMiddleware, tweet.create);

// Find One
router.get("/:id", tweet.findOne);

// Update One
router.put('/update/:id', jwtMiddleware, joiMiddleware, tweet.update);

// Delete one
router.delete('/:id', jwtMiddleware, tweet.delete);

module.exports = router