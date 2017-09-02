const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');


// Create Local strategy
const localLogin = new LocalStrategy({ usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ email },
      (err1, user) => {
        if (err1) { return done(err1, false); }

        if (!user) { return done(null, false); }
        user.comparePassword(password, user.password,
          (err2, isMatch) => {
            if (err2) { return done(err2, false); }
            return done(null, isMatch ? user : false);
          });
      }
    );
  }
);

// Setup options for JWT Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions,
  (payload, done) => {
    User.findById(payload.sub,
      (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
        return null;
      }
    );
  }
);


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
