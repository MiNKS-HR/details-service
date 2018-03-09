const mongoose = require('mongoose');
const mock = require('./mock.json');

mongoose.connect('mongodb://localhost/experiences');

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
  notes: String,
  language: String,
  duration: Number,
  city: String,
  view_count: Number,
  spots_left: Number,
  what_well_do: String,
  who_can_come: String,
  what_ill_provide: String,
  location: {
    lat: Number,
    lng: Number,
  },
});


// Checks to see if the collection has any items and removes them
// before adding new items from mock.json
const Detail = mongoose.model('Detail', modelSchema);
Detail.find({}).remove(() => {
  Detail.create(mock, (err) => {
    if (err) throw err;
    console.log('Database seeded!');
    mongoose.connection.close();
  });
});

module.exports = modelSchema;
