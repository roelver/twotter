const Twot = require('../models/twot');

exports.addTwot = function (req, res, next) {
  const user = req.user;
  const data = req.body;
  if (user && user['_id']) {
    Twot.findOne({ user }, (err, existingTwots) => {
      if (err) {
        return next(err);
      }
      let twot = {};
      if (existingTwots) {
        existingTwots.twots.unshift({ text: data.text, posted: new Date() });
        twot = existingTwots;
      } else {
        twot = new Twot({ user, twots: [data] });
      }
      twot.save()
        .then((t) => {
          const reply = {
            id: t['_id'],
            userid: user['_id'],
            fullname: user.fullname,
            avatarUrl: user.avatarUrl,
            twots: [
              { _id: t.twots[0]['_id'],
                text: t.twots[0].text,
                posted: t.twots[0].posted
              }
            ]
          };
          return res.json(reply);
        })
        .catch(err2 => next(err2));
    });
  }
};

exports.getLastTwots = function (req, res, next) {
  const user = req.user;
  const start = req.params.start || 0;
  const end = start + 10;
  if (user && user['_id']) {
    Twot.findOne({ user: user['_id'] }, (err, existingTwots) => {
      if (err) {
        return next(err);
      }
      if (existingTwots && existingTwots.twots.length >= start) {
        const data = {
          id: existingTwots._id,
          userid: existingTwots.user,
          fullname: user.fullname,
          avatarUrl: user.avatarUrl,
          twots: existingTwots.twots.filter((twot, index) => (index >= start && index < end))
        };
        res.json(data);
      } else {
        res.status(404).send({ message: 'No more twots' });
      }
    });
  }
};

exports.deleteTwot = function (req, res, next) {
  const user = req.user;
  const index = req.params.index;
  if (user && user['_id']) {
    Twot.findOne({ user: user['_id'] }, (err, existingTwots) => {
      if (err) {
        return next(err);
      }
      if (existingTwots && existingTwots.twots.length >= index) {

        existingTwots.twots.splice(index, 1);
        existingTwots.save()
          .then(() => res.json({ message: 'OK' }))
          .catch(err2 => next(err2));
      } else {
        res.status(404).send({ message: 'No twots' });
      }
    });
  }
};

