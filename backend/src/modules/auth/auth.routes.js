const express = require('express');
const { body } = require('express-validator');
const validate = require('../../middleware/validate.middleware');
const authController = require('./auth.controller');

const router = express.Router();

// POST /auth/login — SRS §5.1
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Must be a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  validate,
  authController.login
);

module.exports = router;
