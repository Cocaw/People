const httpStatus = require('../helpers/httpStatus')

const ERROR_HANDLERS = {
    defaultError: (res, err) => res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ error: err.name, cause: err.message }),
    MongoServerError: (res, err) => 
        res
            .status(httpStatus.UNAUTHORIZED)
            .send({
                error: err.name,
                cause: err.message,
                message: 'No podes utilizar el mismo username, email o phone'
            }),
}

const errorHandler = (err, req, res, next) => {
    const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
    handler(res, err)
}

module.exports = errorHandler;