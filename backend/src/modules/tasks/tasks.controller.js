const tasksService = require('./tasks.service');
const { sendSuccess, sendError } = require('../../utils/response.utils');

class TasksController {
  async createTask(req, res) {
    try {
      const result = await tasksService.createTask(req.body, req.user);
      return sendSuccess(res, result, 201);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 404 ? 'NOT_FOUND' : statusCode === 400 ? 'VALIDATION_ERROR' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async getTasks(req, res) {
    try {
      const result = await tasksService.getTasks(req.query, req.user);
      return sendSuccess(res, result, 200);
    } catch (error) {
      return sendError(res, 500, 'SERVER_ERROR', 'An unexpected error occurred');
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const result = await tasksService.updateTaskStatus(req.params.id, req.body.status, req.user);
      return sendSuccess(res, result, 200);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 404 ? 'NOT_FOUND' : statusCode === 403 ? 'FORBIDDEN' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async assignTask(req, res) {
    try {
      const result = await tasksService.assignTask(req.params.id, req.body.assignedTo);
      return sendSuccess(res, result, 200);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 404 ? 'NOT_FOUND' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async deleteTask(req, res) {
    try {
      const result = await tasksService.deleteTask(req.params.id);
      return sendSuccess(res, result, 200);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 404 ? 'NOT_FOUND' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }
}

module.exports = new TasksController();
