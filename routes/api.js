const express = require('express');
const testRouter = require('./testRoutes');

const app = express();

app.use('/Test/', testRouter);

module.exports = app;
