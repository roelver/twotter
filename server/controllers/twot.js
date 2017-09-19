const Twot = require('../models/twot');
const { processHashesOnAdd, processHashesOnDelate } = require('../services/hash-helper');

exports.addTwot = function (req, res, next) {
  const user = req.user;
  const data = req.body;
  if (user && user._id) {
    const twot = new Twot();
    twot.user = user;
    twot.text = data.text;
    twot.posted = new Date();
    twot.save()
      .then((t) => {
        const reply = [{
          _id: t._id,
          text: t.text,
          posted: t.posted,
          user: {
            _id: user._id,
            fullname: user.fullname,
            avatarUrl: user.avatarUrl
          }
        }];
        processHashesOnAdd(t)
          .then((tw) => {
            return res.json(reply);
          });
      });
  }
};

exports.deleteTwot = async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  if (user && user._id) {
    await Twot.findById(id).exec((err, result) => {
      if (err) {
        return next(err);
      }
      if (result) {
        result.remove()
          .then(data => res.json({ message: 'OK' }))
          .catch(err1 => res.status(500).send({ error: err1 }));
      } else {
        return res.status(404).send({ message: 'No twots' });
      }
    });
  } else {
    res.status(404).send({ message: 'No twots' });
  }
};
