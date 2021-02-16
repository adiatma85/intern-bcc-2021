const tweet = require('../controller/tweet.controller')
const router = require('express').Router();

// List of all tweet
router.get("/", tweet.findAll);

// Create a tweet
router.post("/", tweet.create);

// Find One
router.get("/:id", tweet.findOne);

// Update One
router.put('/:id', tweet.update);

// Delete one
router.delete('/:id', tweet.delete);

module.exports = app => {
    app.use('/tweet', router)
}