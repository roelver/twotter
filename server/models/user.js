const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  fullname: String,
  avatarUrl: String,
  password: String
});

// encrypt password
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (errx, hash) => {
      if (errx) { return next(errx); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword =
   (candidatePassword, checkPassword, callback) => {
     bcrypt.compare(candidatePassword, checkPassword,
       (err, isMatch) => {
         if (err) { return callback(err); }
         callback(null, isMatch);
       });
   };

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
