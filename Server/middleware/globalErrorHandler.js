import app from '../app.js';

const ErrorHandler = () => {
  // NotFound ErrorHandler
  app.use('*', (req, res, next) => {
    const err = new Error('Route Not Found');
    err.statusCode = 404;
    next(err);
  });

  // global ErrorHandler
  app.use((err, req, res, next) => {
    let customError = {
      // set default
      statusCode: err.statusCode || 500,
      msg: err.message || 'Something went wrong try again later',
    };

    if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',');
      customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
      customError.msg = `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
      customError.msg = `No item found with id : ${err.value}`;
      customError.statusCode = 404;
    }

    return res.status(customError.statusCode).send(customError.msg);
  });
};

export default ErrorHandler;
