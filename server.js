'use strict';

const express = require('express');
const morgan = require('morgan');

const { PORT } = require('./config');

const acctRouter = require('./routes/accounts');
const custRouter = require('./routes/customers');
const prodRouter = require('./routes/products');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.json());

// GET http://localhost:808/api/customers

app.use('/api/accounts', acctRouter);
app.use('/api/customers', custRouter);
app.use('/api/products', prodRouter);

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// NOTE: we'll prevent stacktrace leak in later exercise
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
