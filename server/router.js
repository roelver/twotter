const passport = require('passport');

const Authentication = require('./controllers/authentication');
const TwotController = require('./controllers/twot');
const HashtagController = require('./controllers/hashtag');
const QueryController = require('./controllers/query');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hoi: 'there' });
  });

  app.get('/me', requireAuth, Authentication.me);
  app.get('/profile/:email', requireAuth, Authentication.profile);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/twot/:start', requireAuth, QueryController.getOwnTwots);
  app.get('/twot', requireAuth, QueryController.getOwnTwots);
  app.get('/twot/h/:hashtag/:start', requireAuth, QueryController.getTwotsByHashtag);
  app.get('/twot/h/:hashtag', requireAuth, QueryController.getTwotsByHashtag);
  app.post('/twot', requireAuth, TwotController.addTwot);
  app.delete('/twot/:id', requireAuth, TwotController.deleteTwot);

  app.post('/hashtag', requireAuth, HashtagController.addHashtag);

};
