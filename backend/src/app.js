const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const { requestLogger } = require('./middleware/logger.middleware');
const routes = require('./routes');
const { sendError } = require('./utils/response.utils');

const app = express();

// Security headers
app.use(helmet());

// CORS — whitelist frontend origin per SRS §10
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

// Rate limiting on auth endpoints per SRS §10
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 login attempts per window
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT',
      message: 'Too many login attempts. Please try again later.',
    },
  },
});
app.use('/api/auth', authLimiter);

// Mount all routes under /api
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  sendError(res, 404, 'NOT_FOUND', `Route ${req.method} ${req.url} not found`);
});

// Global error handler per SRS §12
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  sendError(res, 500, 'SERVER_ERROR', 'An unexpected error occurred');
});

module.exports = app;
