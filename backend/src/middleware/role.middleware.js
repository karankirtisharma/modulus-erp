const { sendError } = require('../utils/response.utils');

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 403, 'FORBIDDEN', 'Access denied. Insufficient permissions.');
    }
    next();
  };
};

module.exports = allowRoles;
