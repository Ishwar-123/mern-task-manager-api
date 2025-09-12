const errorMiddleware = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ');
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid resource ID';
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    console.error('Error:', err);

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorMiddleware;
