const dashboardService = require('./dashboard.service');
const { sendSuccess, sendError } = require('../../utils/response.utils');
const env = require('../../config/env');

class DashboardController {
  async getStats(req, res) {
    try {
      const result = await dashboardService.getStats(req.user);
      return sendSuccess(res, result, 200);
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return sendError(res, 500, 'SERVER_ERROR', error.message, env.NODE_ENV === 'development' ? error.stack : null);
    }
  }
}

module.exports = new DashboardController();
