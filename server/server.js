const parser =  require( 'body-parser' );
const mongoose = require( 'mongoose' );
const express = require( 'express' );
const morgan = require( 'morgan' );
const path = require( 'path' );

//setup mongoose
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
  notes: String,
  lat: Number,
  long: Number
} );


//setup express
const port = process.env.PORT || 3004;
const app = express( );
app.use( parser.json( ));
app.use( morgan( 'dev' ));
app.use( express.static( path.join( __dirname, '../public' )));

app.get('/experience/details', (req, res) => {
  var Detail = mongoose.model('Detail', modelSchema);
  Detail.find({}, (err, data) => {
    if (err) { 
      throw err; 
    } else {
      res.send(data[0]);
    }
  });
});

app.listen( port, ( ) => {
  console.log( `server running at: http://localhost:${port}` )
});