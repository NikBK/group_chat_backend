const { authenticateToken } = require('./authMiddleware');
const { handle404Error, handleGlobalError } = require('./errorHandler');
const { verifyAdmin } = require('./verifyAdmin');

module.exports = {
  authenticateToken,
  handle404Error,
  handleGlobalError,
  verifyAdmin,
};
