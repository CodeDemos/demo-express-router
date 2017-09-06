'use strict';
const express = require('express');
const router = express.Router();

let currentId = 1000;

router.get('/', getCustomerList);

router.get('/:id', getCustomerById);

router.post('/', addCustomer);

router.put('/', updateCustomer);

router.delete('/', deleteCustomer);


function addCustomer(req, res) {
  console.log('Create new Customer');
  const id = currentId++;
  res.location(req.originalUrl + id).status(201).json({});
}

function updateCustomer(req, res) {
  console.log('Update Customer');
  res.json({});
}

function getCustomerById(req, res) {
  console.log('Get Customer ' + req.params.id);
  res.json({});
}

function getCustomerList(req, res) {
  console.log('Get list of Customer');
  res.json([{}, {}, {}, {}]); 
}

function deleteCustomer(req, res) {
  console.log('Delete Customer');
  res.sendStatus(204);
}

module.exports = router;