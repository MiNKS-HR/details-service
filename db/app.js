const mongoose = require('mongoose');

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

const Detail = mongoose.model('Detail', modelSchema);

const findAll = (callback) => {
  Detail.find({}).exec(callback);
}

const insertOne = (detail, callback) => {
  Detail.create(detail, function (err, data) {
    if (err) return handleError(err);
    callback(data);
  })
}

const findHost = (name, callback) => {
  Detail.find({ 'host.name': name }).exec(callback);
}

const updateViews = (id, callback) => {
  Detail.findOneAndUpdate(
    { id: id },
    { $inc: { view_count: 1 } },
    { new: true }
  ).exec(callback);
}

module.exports.findAll = findAll;
module.exports.insertOne = insertOne;
module.exports.findHost = findHost;
module.exports.updateViews = updateViews;