const express = require('express');
const { body, param } = require('express-validator');
const authMiddleware = require('../../middleware/auth.middleware');
const allowRoles = require('../../middleware/role.middleware');
const validate = require('../../middleware/validate.middleware');
const leavesController = require('./leaves.controller');

const router = express.Router();

// POST /leaves/apply — SRS §5.4 (Employee only)
router.post(
  '/apply',
  authMiddleware,
  allowRoles('employee'),
  [
    body('leaveType')
      .isIn(['sick', 'casual', 'annual', 'unpaid'])
      .withMessage('Leave type must be sick, casual, annual, or unpaid'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required'),
    body('reason')
      .isLength({ min: 10 })
      .withMessage('Reason must be at least 10 characters'),
  ],
  validate,
  leavesController.applyLeave
);

// PATCH /leaves/:id/approve — SRS §5.4 (Admin/Manager only)
router.patch(
  '/:id/approve',
  authMiddleware,
  allowRoles('admin', 'manager'),
  [
    param('id').isMongoId().withMessage('Invalid leave ID'),
    body('status')
      .isIn(['approved', 'rejected'])
      .withMessage('Status must be approved or rejected'),
    body('remarks').optional().isString(),
  ],
  validate,
  leavesController.approveLeave
);

// GET /leaves — SRS §5.4 (All roles, filtered by service)
router.get(
  '/',
  authMiddleware,
  leavesController.getLeaves
);

module.exports = router;
