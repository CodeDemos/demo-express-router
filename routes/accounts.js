'use strict';

const express = require('express');
const router = express.Router();

const simDB = require('../db/simDB');
const accountsData = require('../db/accounts');
const accounts = simDB.initialize(accountsData);

router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  accounts.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  accounts.find(id, (err, item) => {
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

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  accounts.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(204);
  });
});

module.exports = router;