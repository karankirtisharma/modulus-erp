const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const usersController = require('../modules/users/users.controller');

const authRoutes = require('../modules/auth/auth.routes');
const usersRoutes = require('../modules/users/users.routes');
const tasksRoutes = require('../modules/tasks/tasks.routes');
const leavesRoutes = require('../modules/leaves/leaves.routes');
const dashboardRoutes = require('../modules/dashboard/dashboard.routes');

const router = express.Router();

// Mount module routes
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);
router.use('/leaves', leavesRoutes);
router.use('/dashboard', dashboardRoutes);

// GET /profile — SRS §5.2 (standalone route, all roles)
router.get('/profile', authMiddleware, usersController.getProfile);

// Health check
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'MODULUS ERP API is running', timestamp: new Date().toISOString() });
});

module.exports = router;
