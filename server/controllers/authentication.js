const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
  const { email, username, fullname, avatarUrl, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'Email and password are required' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    const user = new User({ email, username, fullname, avatarUrl, password });
    user.save((errx) => {
      if (errx) { return next(errx); }
      res.append('Token', tokenForUser(user));
      res.append('Access-Control-Expose-Headers', 'Token');
      res.json({ id: user._id, email: user.email, username: user.username,
        fullname: user.fullname, avatarUrl: user.avatarUrl });
    });
  });
};

exports.signin = (req, res) => {
  // Email and password are validate by local passport strategy!!
  // Passport has added the user to the request (see: done(null,user);
  res.append('Token', tokenForUser(req.user));
  res.append('Access-Control-Expose-Headers', 'Token');
  const { _id, email, username, fullname, avatarUrl } = req.user;
  res.json({ id: _id, email, username, fullname, avatarUrl });
};

exports.me = (req, res) => {
  const { _id, email, username, fullname, avatarUrl } = req.user;
  res.json({ id: _id, email, username, fullname, avatarUrl });
};


exports.profile = (req, res, next) => {
  const emailx = req.params.email;
  if (!emailx) {
    res.status(422).send({ error: 'Email is required' });
  }
  User.findOne({ email: emailx }, (err, user) => {
    const existingUser = user;
    if (err) {
      return next(err);
    }
    if (!existingUser) {
      return res.status(404).send({ error: 'User not found' });
    }
    const { _id, email, username, fullname, avatarUrl } = req.user;
    res.json({ id: _id, email, username, fullname, avatarUrl });
  });
};
