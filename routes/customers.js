'use strict';

const express = require('express');
const router = express.Router();

const simDB = require('../db/simDB');
const customersData = require('../db/customers');
const customers = simDB.initialize(customersData);

router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;
  customers.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  customers.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next(); // goto 404
    }
  });
});

router.post('/', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  customers.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(204);
  });
});

module.exports = router;
