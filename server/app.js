const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/app');

const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('../webpack.config.js');

const compiler = webpack(config);

app.use(morgan('dev'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

const sendIndex = (req, res) => (res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

app.get('/:id', sendIndex);
app.get('/', sendIndex);

app.use('/details/content', express.static(path.join(__dirname, '..', 'public')));

mongoose.connect('mongodb://database/experiences');

app.get('/details/:id', (req, res) => {
  const id = Number(req.params.id);
  db.findAll((err, data) => {
    if (err) { res.sendStatus(404); }
    db.updateViews(id, (dberr) => { if (dberr) throw dberr; });
    res.send(data[id - 1]);
  });
});

app.get('/details/host/:name', (req, res) => {
  db.findHost(req.params.name, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(data);
    }
  });
});

module.exports = app;
