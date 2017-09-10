const Twot = require('../models/twot');

exports.addTwot = function (req, res, next) {
  const user = req.user;
  const data = req.body;
  if (user && user['_id']) {

    Twot.findOne({ user }, (err, existingTwots) => {
      if (err) {
        return next(err);
      }
      if (existingTwots) {
        existingTwots.twots.unshift({ text: data.text, posted: data.posted });
        existingTwots.save()
          .then(() => res.json({ status: 'OK' }))
          .catch(err2 => next(err2));
      } else {
        const twot = new Twot({ user, twots: [data] });
        twot.save()
          .then(() => res.json({ status: 'OK' }))
          .catch(err2 => next(err2));
      }
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

