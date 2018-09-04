var express = require('express');

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/favicon.ico'))
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
});