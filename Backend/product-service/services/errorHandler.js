class ErrorHandler extends Error {
    constructor(statusCode, message, details = null) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.details = details;
    }
  }
  
  const handleError = (err, req, res, next) => {
    const { statusCode = 500, message, details } = err;
    
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
      details
    });
  };
  
  module.exports = {
    ErrorHandler,
    handleError
  };