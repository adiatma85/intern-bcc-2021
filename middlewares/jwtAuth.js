const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Ambil tokennya
    if (token == null) next({
        statusCode: 401,
        message: "No token found."
    })

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) return next(err)
        req.user = user
        next()
    })
}

module.exports = authenticateToken