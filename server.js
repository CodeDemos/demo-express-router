'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

const acctRouter = require('./routes/accounts');
const custRouter = require('./routes/customers');
const prodRouter = require('./routes/products');

app.use(morgan('common'));

app.use(express.static('public'));

// Mount the router at the specified path (e.g. `/accounts`)
// The “mount” path is stripped and so only the remaining path
// is visible to the router
app.use('/accounts', acctRouter);
app.use('/customers', custRouter);
app.use('/products', prodRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
