const { verifyToken } = require('../utils/jwt.utils');
const { sendError } = require('../utils/response.utils');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'UNAUTHORIZED', 'No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
  }
};

module.exports = authMiddleware;
