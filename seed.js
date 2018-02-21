const mongoose = require('mongoose');
const mock =require('./mock.json');

mongoose.connect('mongodb://127.0.0.1/experiences');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var modelSchema = new Schema( {
  id: Number,
  experience_title: String,
  host_name: String,
  experience_category: String,
  host_picture_url: String,
  amenities: String,
  duration: Number,
  language: String,
  host_about: String,
  what_well_do: String,
  what_ill_provide: String,
  who_can_come: String,
  notes: String
} );
var Detail = mongoose.model('Detail', modelSchema);

Detail.find({}).remove(() => {
  Detail.create(mock, ( err ) => {
    if ( err ) throw err;
    else {
      console.log( 'worked!' );
      db.close();
    }
  })
});
