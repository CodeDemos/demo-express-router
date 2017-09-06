'use strict';
const express = require('express');
const router = express.Router();

let currentId = 1000;

const addProduct = (req, res) => {
  console.log('Create new Product');
  const id = currentId++;
  res.location(req.originalUrl + id).status(201).json({});
};

const updateProduct = (req, res) => {
  console.log('Update Product');
  res.json({});
};

const getProductById = (req, res) => {
  console.log('Get Product ' + req.params.id);
  res.json({});
};

const getProductList = (req, res) => {
  console.log('Get list of Product');
  res.json([{}, {}, {}, {}]); 
};

const deleteProduct = (req, res) => {
  console.log('Delete Product');
  res.sendStatus(204);
};

router.get('/', getProductList);

router.get('/:id', getProductById);

router.post('/', addProduct);

router.put('/', updateProduct);

router.delete('/', deleteProduct);

module.exports = router;