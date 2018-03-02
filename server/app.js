const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/app.js');


// setup express
const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://localhost/experiences');

app.get('/experience/details', (req, res) => {
  db.findAll((err, data) => {
    if (err) { res.sendStatus(40); }
    const id = Math.floor(Math.random() * Math.floor(200));
    db.updateViews(id+1, (dberr) => { if (dberr) throw dberr; });
    res.send(data[id]);
  });
});

app.get('/host/:name', (req, res) => {
  db.findHost(req.params.name, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.send(data);
      }
    });
});

module.exports = app;
