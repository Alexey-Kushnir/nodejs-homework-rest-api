const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { contactsRouter, usersRouter } = require('./routes/api');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
// app.use(express.json());  use jsonParser middleware

// for access to files by link
app.use(express.static('public'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  handler: (req, res, next) => {
    return res.status(400).json({
      status: 'error',
      code: 400,
      data: 'Bad request',
      message: 'Too many requests, please try again later.',
    });
  },
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
