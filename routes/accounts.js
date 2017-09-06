'use strict'; 
const express = require('express');
const router = express.Router();

let currentId = 1000;

router.use('/', (req,res,next) => {
  console.log('accounts', new Date(), req.method, req.url);
  next();
});

router.get('/', (req, res) => {
  console.log('Get list of accounts');
  res.json([{}, {}, {}, {}]);
});

router.get('/:id', (req, res) => {
  console.log('Get account ');
  res.json({});
});

router.post('/', (req, res) => {
  console.log('Create new account');
  const id = currentId++;
  res.location(req.originalUrl + id).status(201).json({});
});

router.put('/:id', (req, res) => {
  console.log('Update account ' + req.params.id);
  res.json({});
});

router.delete('/:id', (req, res) => {
  console.log('Delete account');
  res.sendStatus(204);
});

module.exports = router;