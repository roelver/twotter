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
          .then((err) => {
            if (err) {
              next(err);
            }
            return res.json({ status: 'OK1' });
          });
      } else {
        const twot = new Twot({ user, twots: [data] });
        twot.save()
          .then((err1) => {
            if (err1) {
              next(err);
            }
            return res.json({ status: 'OK2' });
          });
      }
      return;
    });
  }
};

exports.getLastTwots = function (req, res, next) {
  const user = req.user;
  const start = req.params.start || 0;
  const end = start + 10;
  if (user && user['_id']) {
    console.log(user);
    Twot.findOne({ user: user['_id'] }, (err, existingTwots) => {
      if (err) {
        return next(err);
      }
      if (existingTwots) {
        const data = {
          id: existingTwots._id,
          userid: existingTwots.user,
          twots: existingTwots.twots.filter((twot, index) => (index >= start && index < end))
        };
        console.log('twots',data);
        return res.json(data);
      } else {
        return res.status(404).send({ message: 'No twots1' });
      }
      return '';
    });
    return;
  }
  res.status(404).send({ message: 'No twots2' });
};

