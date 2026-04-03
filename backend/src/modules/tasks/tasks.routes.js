const express = require('express');
const { body, param } = require('express-validator');
const authMiddleware = require('../../middleware/auth.middleware');
const allowRoles = require('../../middleware/role.middleware');
const validate = require('../../middleware/validate.middleware');
const tasksController = require('./tasks.controller');

const router = express.Router();

// POST /tasks/create — SRS §5.3
router.post(
  '/create',
  authMiddleware,
  allowRoles('admin', 'manager'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('assignedTo').isMongoId().withMessage('Valid assignedTo user ID is required'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high', 'critical'])
      .withMessage('Priority must be low, medium, high, or critical'),
    body('dueDate').isISO8601().withMessage('Valid due date is required'),
  ],
  validate,
  tasksController.createTask
);

// GET /tasks — SRS §5.3
router.get(
  '/',
  authMiddleware,
  tasksController.getTasks
);

// PATCH /tasks/:id/status — SRS §5.3
router.patch(
  '/:id/status',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('status')
      .isIn(['pending', 'in-progress', 'completed'])
      .withMessage('Status must be pending, in-progress, or completed'),
  ],
  validate,
  tasksController.updateTaskStatus
);

// PATCH /tasks/:id/assign — SRS §5.3
router.patch(
  '/:id/assign',
  authMiddleware,
  allowRoles('admin', 'manager'),
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('assignedTo').isMongoId().withMessage('Valid assignedTo user ID is required'),
  ],
  validate,
  tasksController.assignTask
);

// DELETE /tasks/:id — SRS §5.3
router.delete(
  '/:id',
  authMiddleware,
  allowRoles('admin', 'manager'),
  [param('id').isMongoId().withMessage('Invalid task ID')],
  validate,
  tasksController.deleteTask
);

module.exports = router;
