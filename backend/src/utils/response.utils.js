/**
 * Standard response formatters per SRS §12
 */

const sendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    ...data,
  });
};

const sendError = (res, statusCode, code, message, details = null) => {
  const errorResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };
  if (details) {
    errorResponse.error.details = details;
  }
  return res.status(statusCode).json(errorResponse);
};

module.exports = { sendSuccess, sendError };
