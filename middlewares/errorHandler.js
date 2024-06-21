function handle404Error(req, res, next) {
  const error = new Error('404 Route Not Found');
  error.status = 404;
  next(error);
}

function handleGlobalError(err, req, res, next) {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
}

module.exports = {
  handle404Error,
  handleGlobalError,
};
