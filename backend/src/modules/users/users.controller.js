const usersService = require('./users.service');
const { sendSuccess, sendError } = require('../../utils/response.utils');

class UsersController {
  async createUser(req, res) {
    try {
      const result = await usersService.createUser(req.body, req.user);
      return sendSuccess(res, result, 201);
    } catch (error) {
      console.error('createUser error:', error);
      const statusCode = error.statusCode || 500;
      const code = statusCode === 403 ? 'FORBIDDEN' : statusCode === 409 ? 'CONFLICT' : statusCode === 400 ? 'VALIDATION_ERROR' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async getUsers(req, res) {
    try {
      const result = await usersService.getUsers(req.query, req.user);
      return sendSuccess(res, result, 200);
    } catch (error) {
      console.error('getUsers error:', error);
      return sendError(res, 500, 'SERVER_ERROR', 'An unexpected error occurred');
    }
  }

  async getUserById(req, res) {
    try {
      const result = await usersService.getUserById(req.params.id, req.user);
      return sendSuccess(res, { user: result }, 200);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 404 ? 'NOT_FOUND' : statusCode === 403 ? 'FORBIDDEN' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await usersService.deleteUser(req.params.id);
      return sendSuccess(res, result, 200);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 404 ? 'NOT_FOUND' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async getProfile(req, res) {
    try {
      const result = await usersService.getProfile(req.user.id);
      return sendSuccess(res, { user: result }, 200);
    } catch (error) {
      console.error('getProfile error:', error);
      return sendError(res, 500, 'SERVER_ERROR', 'An unexpected error occurred');
    }
  }
}

module.exports = new UsersController();
