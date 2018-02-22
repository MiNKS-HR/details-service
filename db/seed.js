const mongoose = require('mongoose');
const mock = require('./mock.json');

mongoose.connect('mongodb://127.0.0.1/experiences');

const { Schema } = mongoose;
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
