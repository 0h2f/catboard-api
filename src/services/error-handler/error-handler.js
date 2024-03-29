const { logger } = require("./logger");

/*
NOTE: Consider using an array of error messages to display 
in frond end for users feedback. Or best than this, create
other type of erros when the request response is an 200 
but there are minor validation errors.
*/
class baseError extends Error {

    constructor(name, description, isOperational = false) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

class httpError extends baseError {

    constructor(name, httpCode, description, isOperational = true) {
        super(name, description, isOperational);
        Object.setPrototypeOf(this, new.target.prototype);

        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}

class badRequest extends httpError {
    constructor(description, isOperational = true) {

        super('BAD_REQUEST', httpStatusCode.BAD_REQUEST, description, isOperational);

        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this);
    }
}

class unauthorized extends httpError {
    constructor(description, isOperational = true) {

        super('UNAUTHORIZED', httpStatusCode.UNAUTHORIZED, description, isOperational);

        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this);
    }
}


class forbidden extends httpError {
    constructor(description, isOperational = true) {

        super('FORBIDDEN', httpStatusCode.FORBIDDEN, description, isOperational);

        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this);
    }
}

class notFound extends httpError {
    constructor(description, isOperational = true) {

        super('NOT_FOUND', httpStatusCode.NOT_FOUND, description, isOperational);

        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this);
    }
}

class conflict extends httpError {
    constructor(description, isOperational = true) {

        super('CONFLICT', httpStatusCode.CONFLICT, description, isOperational);

        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this);
    }
}

class internalServer extends httpError {
    constructor(description, isOperational = true) {

        super('INTERNAL_SERVER', httpStatusCode.INTERNAL_SERVER, description, isOperational);

        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this);
    }
}

class ErrorHandler {
    async handleError(err, res, next) {
        res.status(err.httpCode).send({
            message: err.message
        });
    }

    async logTrace(trace) {
        await logger.trace(
            'Trace message from the error handler: \n',
            trace
        );
    }

    async logError(err) {
        await logger.error(
            'Error message from the error handler: \n',
            err
        );
    }

    isTrustedError(err) {
        if (err instanceof httpError) {
            return err.isOperational;
        }
        return false;
    }
}

const httpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401, 
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500
}
Object.freeze(httpStatusCode);

const errorHandler = new ErrorHandler;
module.exports = {
    baseError,
    httpError,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    internalServer,
    errorHandler,
    httpStatusCode
}