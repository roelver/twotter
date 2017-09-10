const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const twotSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'UserSchema' },
  twots: [{
    text: String,
    posted: Date
  }]
});

const ModelClass = mongoose.model('twot', twotSchema);

module.exports = ModelClass;
