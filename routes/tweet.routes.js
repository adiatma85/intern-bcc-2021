const tweet = require('../controller/tweet.controller')
const router = require('express').Router();
const jwtMiddleware = require('../middlewares/jwtAuth')

// List of all tweet
router.get("/", tweet.findAll);

// Create a tweet
router.post("/", jwtMiddleware, tweet.create);

// Find One
router.get("/:id", tweet.findOne);

// Update One
router.put('/:id', jwtMiddleware, tweet.update);

// Delete one
router.delete('/:id', jwtMiddleware, tweet.delete);

module.exports = router