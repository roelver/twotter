const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashtagSchema = new Schema({
  text: { type: String, unique: true },
  refs: [{ type: Schema.ObjectId }]
});

module.exports = mongoose.models.Hashtag || mongoose.model('hashtag', hashtagSchema);