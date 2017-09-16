const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const twotSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'UserSchema' },
  seqno: Number,
  oldest: Date,
  newest: Date,
  twots: [{
    text: String,
    posted: Date
  }]
});

const ModelClass = mongoose.model('twot', twotSchema);

module.exports = ModelClass;
