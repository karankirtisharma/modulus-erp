const authService = require('./auth.service');
const { sendSuccess, sendError } = require('../../utils/response.utils');
const env = require('../../config/env');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      return sendSuccess(res, result, 200);
    } catch (error) {
      if (error.statusCode === 401) {
        return sendError(res, 401, 'UNAUTHORIZED', error.message);
      }
      console.error('Login error:', error);
      return sendError(res, 500, 'SERVER_ERROR', error.message, env.NODE_ENV === 'development' ? error.stack : null);
    }
  }
}

module.exports = new AuthController();
