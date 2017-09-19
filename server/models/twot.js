const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const twotSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'user' },
  posted: Date,
  text: String
});

const TwotClass = mongoose.model('twot', twotSchema);

module.exports = TwotClass;
