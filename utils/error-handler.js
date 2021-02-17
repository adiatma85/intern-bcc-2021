function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({message: err})
            break;
        case (typeof err === 'object' && err.statusCode != null):
            return res.status(err.statusCode).json({
                message: err.message
            })
            break;
        default:
            return res.status(500).json({message: err.message})
    }
}

module.exports = errorHandler
