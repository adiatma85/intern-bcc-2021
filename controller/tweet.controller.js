const db = require("../models");
const Tweet = db.tweets

// Create and Save new Tweets
function create(req, res, _next) {
    console.log(req.user)
    req.body.userId = req.user.id
    Tweet.create(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating tweet"
            })
        })
}

// Retrive all tweets
function findAll(req, res, next) {
    var condition = {}
    Tweet.findAll({ where: condition })
        .then(data => {
            if (data.length == 0) {
                res.send({
                    message: "No data is existed"
                })
            }
            res.send(data)
        })
        .catch(err => {
            next(err)
            return;
        })
}

// Find single instance of tweet
function findOne(req, res, next) {
    const id = req.params.id
    Tweet.findByPk(id)
        .then(data => {
            if (data == null) {
                next("The tweet is not found")
                return;
            }
            res.send(data)
        })
        .catch(err => {
            next(err)
            return
        })
}

function findSelfTweet(req, res, next) {
    let condition = {
        userId: req.user.id
    }
    Tweet.findAll({ where: condition })
        .then(data => {
            if (data.length == 0) {
                res.send({
                    message: "No data is existed"
                })
            }
            res.send(data)
        })
        .catch(err => {
            next(err)
            return;
        })
}

// Update a Tweet
function update(req, res, next) {
    const id = req.params.id

    Tweet.update(req.body, {
        where: { id: id }

    })
        // return a number of the deleted instance
        .then(num => {
            if (num == 1) {
                if (num == null) {
                    next("The tweet is not found")
                    return;
                }
                res.send({
                    message: "Tweet was updated successfully",
                })
            } else {
                next(`Cannot update Tweet with id=${id}. Maybe Tweet was not found or req.body is empty!`)
                return;
            }
        })
        .catch(err => {
            next(err)
            return
        })
}

// Delete existing tweet
function _delete(req, res, next) {
    const id = req.params.id

    Tweet.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tweet was deleted successfully!"
                });
            } else {
                next("Cannot delete Tweet with id=${id}. Maybe Tweet was not found!")
                return;
            }
        })
        .catch(err => {
            next(err)
            return;
        })
}

module.exports = {
    create,
    findAll,
    findOne,
    findSelfTweet,
    update,
    delete: _delete
}
