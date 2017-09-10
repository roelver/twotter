const passport = require('passport');

const Authentication = require('./controllers/authentication');
const TwotController = require('./controllers/twot');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });

  app.get('/me', requireAuth, Authentication.me);
  app.get('/profile/:email', requireAuth, Authentication.profile);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/twot/:start', requireAuth, TwotController.getLastTwots);
  app.get('/twot', requireAuth, TwotController.getLastTwots);
  app.post('/twot', requireAuth, TwotController.addTwot);

};
