'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

//NOTE: morgan is 'used' at this point, but the log appear after the request is sent
// this is an feature of morgan so you can add details to the log during the req/res cycle
app.use(morgan('common'));

app.use(express.static('public'));

app.get(['/', '/home', '/index'], (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

// ===== ACCOUNTS =====
let currentId = 1000;

app.use('/accounts', (req,res,next) => {
  console.log('accounts', new Date(), req.method, req.url);
  next();
});

app.get('/accounts', (req, res) => {
  console.log('Get list of accounts');
  res.json([{}, {}, {}, {}]);
});

app.get('/accounts/:id', (req, res) => {
  console.log('Get account ');
  res.json({});
});

app.post('/accounts', (req, res) => {
  console.log('Create new account');
  const id = currentId++;
  res.location(req.originalUrl + id).status(201).json({});
});

app.put('/accounts/:id', (req, res) => {
  console.log('Update account ' + req.params.id);
  res.json({});
});

app.delete('/accounts/:id', (req, res) => {
  console.log('Delete account');
  res.sendStatus(204);
});

// ===== CUSTOMERS =====
app.get('/customers', (req, res) => {
  console.log('Get list of Customer');
  res.json([{}, {}, {}, {}]); 
});

app.get('/customers/:id', (req, res) => {
  console.log('Get Customer ' + req.params.id);
  res.json({});
});

app.post('/customers', (req, res) => {
  console.log('Create new Customer');
  const id = currentId++;
  res.location(req.originalUrl + id).status(201).json({});
});

app.put('/customers', (req, res) => {
  console.log('Update Customer');
  res.json({});
});

app.delete('/customers', (req, res) => {
  console.log('Delete Customer');
  res.sendStatus(204);
});

// ===== PRODUCT =====
app.get('/products', (req, res) => {
  console.log('Get list of Product');
  res.json([{}, {}, {}, {}]); 
});

app.get('/products/:id', (req, res) => {
  console.log('Get Product ' + req.params.id);
  res.json({});
});

app.post('/products', (req, res) => {
  console.log('Create new Product');
  const id = currentId++;
  res.location(req.originalUrl + id).status(201).json({});
});

app.put('/products', (req, res) =>{
  console.log('Update Product');
  res.json({});
});

app.delete('/products', (req, res) => {
  console.log('Delete Product');
  res.sendStatus(204);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
