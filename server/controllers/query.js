const Twot = require('../models/twot');
const Hashtag = require('../models/hashtag');
const User = require('../models/user');

const getTwotById = function (twotId) {
  return new Promise((resolve, reject) => {
    Twot.findById(twotId)
      .populate({
        path: 'user',
        select: ['fullname', 'avatarUrl']
      })
      .exec((err, twot) => {
        if (err) {
          reject(err);
        }
        resolve(twot);
      });
  });
};

exports.getOwnTwots = function (req, res, next) {
  const user = req.user;
  const start = req.params.start || 1;
  if (user && user._id) {
    Twot.find({ user })
      .sort('-posted')
      .skip(start - 1)
      .limit(10)
      .populate({
        path: 'user',
        select: ['fullname', 'avatarUrl']
      })
      .exec((err, results) => {
        if (err) {
          return next(err);
        }
        const data = [...results];
        if (data.length === 0) {
          return res.status(404).send({ message: 'No more twots' });
        }
        return res.json(data);
      });
  }
};

exports.getTwotsByHashtag = function (req, res, next) {
  const hashtag = req.params.hashtag;
  const start = req.params.start || 1;
  Hashtag.findOne({ text: hashtag })
    .exec((err, results) => {
      if (err) {
        return next(err);
      }
      if (results && results.refs.length >= start) {
        Promise.all(
          results.refs.map(async (twid, index) => {
            if ((index + 1) >= start && (index + 1) < (start + 10)) {
              const twot = await getTwotById(twid);
              return twot;
            }
          })
        ).then((twots) => {
          if (twots.length > 0) {
            return res.json(twots.sort((a,b) => (a.posted > b.posted ? -1 : 1)));
          }
          return res.status(404).send({ message: 'No more twots' });
        })
          .catch(errx => res.status(200).send({ message: errx }));
      }
    });
};
