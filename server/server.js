const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// setup mongoose
mongoose.connect('mongodb://127.0.0.1/experiences');

const { Schema } = mongoose;
const modelSchema = new Schema({
  id: Number,
  host: {
    name: String,
    about: String,
    picture_url: String,
  },
  experience: {
    category: String,
    title: String,
  },
  city: String,
  duration: Number,
  language: String,
  what_ill_provide: String,
  notes: String,
  view_count: Number,
  spots_left: Number,
  what_well_do: String,
  who_can_come: String,
  location: {
    lat: Number,
    lng: Number,
  },
});


// setup express
const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

const Detail = mongoose.model('Detail', modelSchema);

app.get('/experience/details', (req, res) => {
  Detail.find({}, (err, data) => {
    if (err) { throw err; }
    const id = Math.floor(Math.random() * Math.floor(200));
    Detail.findOneAndUpdate(
      { id: id + 1 },
      { $inc: { view_count: 1 } },
      { new: true },
      (error) => { if (error) { throw error; } },
    );
    res.send(data[id]);
  });
});

app.get('/host/:name', (req, res) => {
  Detail.find({ 'host.name': req.params.name }, (err, data) => {
    if (err) { throw err; }
    res.send(data);
  });
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
