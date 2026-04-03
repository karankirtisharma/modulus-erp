const leavesService = require('./leaves.service');
const { sendSuccess, sendError } = require('../../utils/response.utils');

class LeavesController {
  async applyLeave(req, res) {
    try {
      const result = await leavesService.applyLeave(req.body, req.user.id);
      return sendSuccess(res, result, 201);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 400 ? 'VALIDATION_ERROR' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async approveLeave(req, res) {
    try {
      const { status, remarks } = req.body;
      const result = await leavesService.approveLeave(
        req.params.id,
        status,
        remarks,
        req.user.id
      );
      return sendSuccess(res, result, 200);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const code = statusCode === 404 ? 'NOT_FOUND' : statusCode === 400 ? 'VALIDATION_ERROR' : 'SERVER_ERROR';
      return sendError(res, statusCode, code, error.message);
    }
  }

  async getLeaves(req, res) {
    try {
      const result = await leavesService.getLeaves(req.query, req.user);
      return sendSuccess(res, result, 200);
    } catch (error) {
      return sendError(res, 500, 'SERVER_ERROR', 'An unexpected error occurred');
    }
  }
}

module.exports = new LeavesController();
