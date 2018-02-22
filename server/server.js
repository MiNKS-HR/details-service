const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// setup mongoose
mongoose.connect('mongodb://127.0.0.1/experiences');

const Schema = mongoose.Schema;
const modelSchema = new Schema({
  id: Number,
  experience_category: String,
  lat: Number,
  host_picture_url: String,
  notes: String,
  what_well_do: String,
  language: String,
  host_about: String,
  host_name: String,
  amenities: String,
  who_can_come: String,
  duration: Number,
  what_ill_provide: String,
  long: Number,
  experience_title: String,
});


// setup express
const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/experience/details', (req, res) => {
  const Detail = mongoose.model('Detail', modelSchema);
  Detail.find({}, (err, data) => {
    if (err) { throw err; }
    res.send(data[0]);
  });
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
