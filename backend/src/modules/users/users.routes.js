const express = require('express');
const { body, param, query } = require('express-validator');
const authMiddleware = require('../../middleware/auth.middleware');
const allowRoles = require('../../middleware/role.middleware');
const validate = require('../../middleware/validate.middleware');
const usersController = require('./users.controller');

const router = express.Router();

// POST /users/create — SRS §5.2
router.post(
  '/create',
  authMiddleware,
  allowRoles('admin', 'manager'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').isIn(['manager', 'employee']).withMessage('Role must be manager or employee'),
    body('department').trim().notEmpty().withMessage('Department is required'),
  ],
  validate,
  usersController.createUser
);

// GET /users — SRS §5.2
router.get(
  '/',
  authMiddleware,
  allowRoles('admin', 'manager'),
  usersController.getUsers
);

// GET /users/:id — SRS §5.2
router.get(
  '/:id',
  authMiddleware,
  [param('id').isMongoId().withMessage('Invalid user ID')],
  validate,
  usersController.getUserById
);

// DELETE /users/:id — SRS §5.2
router.delete(
  '/:id',
  authMiddleware,
  allowRoles('admin'),
  [param('id').isMongoId().withMessage('Invalid user ID')],
  validate,
  usersController.deleteUser
);

module.exports = router;
