const user = require('../controller/user.controller')
const router = require('express').Router();
const jwtMiddleware = require('../middlewares/jwtAuth');
const joiMiddleware = require('../middlewares/joiValidator')


// Register a user
router.post('/register', joiMiddleware, user.create);

// Login a user
router.post('/login', joiMiddleware, user.login)

// Get All User
router.get('/users', user.findAll)

// Show a profile
router.get('/:id', jwtMiddleware, user.findOne)

// Update a profile
router.put('/update', jwtMiddleware, user.update)

// Destroy a profile
router.delete('/destroy', jwtMiddleware, user.destroy)

module.exports = router