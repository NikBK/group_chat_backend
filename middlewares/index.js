const { authenticateToken } = require('./authMiddleware');
const { handle404Error, handleGlobalError } = require('./errorHandler');

module.exports = {
  authenticateToken,
  handle404Error,
  handleGlobalError,
};
