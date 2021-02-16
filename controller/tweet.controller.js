const db = require("../models");
const Tweet = db.tweets
// const Op = db.Sequelize.Op

// Create and Save new Tweets
function create(req, res) {
    const tweet = {
        title: req.body.title,
        content: req.body.content
    }

    Tweet.create(tweet)
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
function findAll(req, res) {
    var condition = {}
    Tweet.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occured while creating tweet"
        }))
}

// Find single instance of tweet
function findOne(req, res) {
    const id = req.params.id
    Tweet.findByPk(id)
        .then(data => {
            if (data == null) {
                res.status(404).send({
                    message: "404 not found"
                })
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || "Some error occured while creating tweet"
                }
            )
        })
}

// Update a Tweet
function update(req, res) {
    const id = req.params.id

    Tweet.update(req.body, {
        where: { id: id }

    })
        // return a number of the deleted instance
        .then(num => {
            if (num == 1) {
                if (num == null) {
                    res.status(404).send({
                        message: "404 not found"
                    })
                }
                res.send({
                    message: "Tweet was deleted successfully",
                })
            } else {
                res.send({
                    message: `Cannot deleted Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while update"
            })
        })
}

// Delete existing tweet
function _delete(req, res) {
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
                res.send({
                    message: `Cannot delete Tweet with id=${id}. Maybe Tweet was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Tutorial with id=" + id
            })
        })
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    delete: _delete
}
