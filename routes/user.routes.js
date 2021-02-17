const user = require('../controller/user.controller')
const router = require('express').Router();
const jwtMiddleware = require('../middlewares/jwtAuth');


// Register a user
router.post('/register', user.create);

// Login a user
router.post('/login', user.login)

// Get All User
router.get('/users', user.findAll)

// Show a profile
router.get('/:id', jwtMiddleware, user.findOne)

// Update a profile
router.put('/update', jwtMiddleware, user.update)

// Destroy a profile
router.delete('/destroy', jwtMiddleware, user.destroy)

module.exports = router