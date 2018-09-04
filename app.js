const express = require('express');
const app = express();
const path = require('path');

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

const wbOptions = require('./webpack.config.js');
const compiler = webpack({ ...wbOptions });

app.use(middleware(compiler));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/favicon.ico'))
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
});

app.listen(3000);