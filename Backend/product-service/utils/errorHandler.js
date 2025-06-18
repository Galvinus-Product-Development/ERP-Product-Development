class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class BadRequestError extends CustomError {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

class ValidationError extends CustomError {
    constructor(errors, message = 'Validation failed') {
        super(message, 422);
        this.errors = errors;
    }
}

const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors
        });
    }
    
    // Handle validation errors from express-validator
    if (err.name === 'ValidationError' || err.name === 'ValidatorError') {
        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors: err.errors || err.array()
        });
    }
    
    // Default error response
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

module.exports = {
    CustomError,
    NotFoundError,
    BadRequestError,
    ValidationError,
    errorHandler
};