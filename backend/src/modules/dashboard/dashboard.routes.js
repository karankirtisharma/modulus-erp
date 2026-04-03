const express = require('express');
const authMiddleware = require('../../middleware/auth.middleware');
const dashboardController = require('./dashboard.controller');

const router = express.Router();

// GET /dashboard/stats — SRS §5.5
router.get('/stats', authMiddleware, dashboardController.getStats);

module.exports = router;
