'use strict';

const express = require('express');
const morgan = require('morgan');

const { PORT } = require('./config');

const simDB = require('./db/simDB');
const accountsData = require('./db/accounts');
const customersData = require('./db/customers');
const productsData = require('./db/products');

const accounts = simDB.initialize(accountsData);
const customers = simDB.initialize(customersData);
const products = simDB.initialize(productsData);

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

// ===== ACCOUNTS ==============================================================

app.get('/api/accounts', (req, res, next) => {
  const { searchTerm } = req.query;

  accounts.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/accounts/:id', (req, res, next) => {
  const id = req.params.id;

  accounts.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.post('/api/accounts', (req, res, next) => {
  const { name} = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  accounts.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/api/accounts/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

app.put('/api/accounts/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  accounts.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.delete('/api/accounts/:id', (req, res, next) => {
  const id = req.params.id;

  accounts.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(204);
  });
});

// ===== CUSTOMERS =============================================================

app.get('/api/customers', (req, res, next) => {
  const { searchTerm } = req.query;
  customers.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/customers/:id', (req, res, next) => {
  const id = req.params.id;

  customers.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.post('/api/customers', (req, res, next) => {
  const { name} = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  customers.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/api/customers/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

app.put('/api/customers/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  customers.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.delete('/api/customers/:id', (req, res, next) => {
  const id = req.params.id;

  customers.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(204);
  });
});

// ===== PRODUCTS ==============================================================

app.get('/api/products', (req, res, next) => {
  const { searchTerm } = req.query;

  products.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/products/:id', (req, res, next) => {
  const id = req.params.id;

  products.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.post('/api/products', (req, res, next) => {
  const { name} = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  products.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/api/products/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

app.put('/api/products/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  products.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.delete('/api/products/:id', (req, res, next) => {
  const id = req.params.id;

  products.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(204);
  });
});

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
