'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

app.use(bodyParser.json());

// ===== ACCOUNTS =====
const accounts = require('./db/storage')('accounts');

// Seed the dummy database
accounts.addOne({ name: 'Business Foo' });
accounts.addOne({ name: 'Corporation Bar' });
accounts.addOne({ name: 'Partnership Baz' });
accounts.addOne({ name: 'Enterprise Qux' });
accounts.addOne({ name: 'Factory Nar' });

app.use('/accounts', (req,res,next) => {
  console.log('accounts', new Date(), req.method, req.url);
  next();
});

app.get('/accounts', (req, res) => {
  const query = req.query;
  const list = accounts.getList(query);
  res.json(list);  
});

app.get('/accounts/:id', (req, res) => {
  const id = req.params.id;
  res.json(accounts.getOne(id));
});

app.post('/accounts', (req, res) => {  
  const account = req.body;
  const newItem = accounts.addOne(account);
  res.location(`/accounts/${newItem.id}`).status(201).json(newItem);
});

app.put('/accounts/:id', (req, res) => {
  const id = req.params.id;
  const account = req.body;
  res.json(accounts.modOne(id, account));
});

app.delete('/accounts/:id', (req, res) => {
  const id = req.params.id;
  accounts.delOne(id);
  return res.sendStatus(204);
});

// ===== CUSTOMERS =====
const customers = require('./db/storage')('customers');

// Seed the dummy database
customers.addOne({ name: 'Bob' });
customers.addOne({ name: 'Jane' });
customers.addOne({ name: 'Jose' });
customers.addOne({ name: 'Marcus' });
customers.addOne({ name: 'Marcia' });

app.get('/customers', (req, res) => {
  const query = req.query;
  const list = customers.getList(query);
  res.json(list);  
});

app.get('/customers/:id', (req, res) => {
  const id = req.params.id;
  res.json(customers.getOne(id));
});

app.post('/customers', (req, res) => {
  const customer = req.body;
  const newItem = customers.addOne(customer);
  res.location(`/customers/${newItem.id}`).status(201).json(newItem);
});

app.put('/customers/:id', (req, res) => {
  const id = req.params.id;
  const customer = req.body;
  res.json(customers.modOne(id, customer));
});

app.delete('/customers/:id', (req, res) => {
  const id = req.params.id;
  customers.delOne(id);
  return res.sendStatus(204);
});

// ===== PRODUCT =====
const products = require('./db/storage')('products');

// Seed the dummy database
products.addOne({ name: 'Widget' });
products.addOne({ name: 'Thing' });
products.addOne({ name: 'Gadget' });
products.addOne({ name: 'Item' });
products.addOne({ name: 'Part' });


app.get('/products', (req, res) => {
  const query = req.query;
  const list = products.getList(query);
  res.json(list);  
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  res.json(products.getOne(id));
});

app.post('/products', (req, res) => {
  const item = req.body;
  const newItem = products.addOne(item);
  res.location(`/products/${newItem.id}`).status(201).json(newItem);
});

app.put('/products/:id', (req, res) =>{
  const id = req.params.id;
  const item = req.body;
  res.json(products.modOne(id, item));
});

app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  products.delOne(id);
  return res.sendStatus(204);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
