const { validationResult } = require('express-validator');
const { sendError } = require('../utils/response.utils');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((err) => ({
      field: err.path,
      msg: err.msg,
    }));
    return sendError(res, 400, 'VALIDATION_ERROR', 'Validation failed', details);
  }
  next();
};

module.exports = validate;
