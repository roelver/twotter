const Twot = require('../models/twot');
const maxTwotsPerDoc = require('../config').maxTwotsPerDoc;


exports.addTwot = function (req, res, next) {
  const user = req.user;
  const data = req.body;
  if (user && user._id) {
    Twot.find({ user }).sort('-seqno').limit(1).exec((err, existingTwots) => {
      if (err) {
        return next(err);
      }
      let twot = {};
      if (existingTwots &&
        existingTwots.length > 0 &&
        existingTwots[0].twots.length < maxTwotsPerDoc) {
        const now = new Date();
        existingTwots[0].twots.unshift({ text: data.text, posted: now });
        twot = existingTwots[0];
        twot.newest = now;
      } else {
        let seqno = 0;
        if (existingTwots > 0) {
          seqno = existingTwots[0].seqno + 1;
        }
        data.posted = new Date();
        twot = new Twot({ user, seqno, oldest: data.posted, newest: data.posted, twots: [data] });
      }
      twot.save()
        .then((t) => {
          const reply = {
            id: t._id,
            userid: user._id,
            fullname: user.fullname,
            avatarUrl: user.avatarUrl,
            twots: [
              { _id: t.twots[0]._id,
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
  if (user && user._id) {
    let counter = 0;
    const data = {
      id: null,
      userid: user['_id'],
      fullname: user.fullname,
      avatarUrl: user.avatarUrl,
      twots: []
    };
    Twot.find({ user }).sort('-seqno' ).exec(function (err, results) {
      if (err) {
        console.log('Error', err);
        return next(err);
      }
      console.log('rows', results.length);
      for (let i = 0; i < results.length && counter < end; i++) {
        const row = results[i];
        if (counter >= start || row.twots.length + counter <= end) {
          if (data.id === null) {
            data.id = row['_id'];
          }
          const begin = Math.max(start - counter, 0);
          const until = Math.min(end - counter, row.twots.length);
          console.log('Counter', counter, 'Begin', begin, 'until', until);
          data.twots.push(...row.twots.slice(begin, until));
          counter += until;
        } else {
          counter += row.twots.length; // skip record
        }
      }
      if (data.id === null) {
        return res.status(404).send({message: 'No more twots'});
      }
      return res.json(data);
    });
   // return res.status(404).send({message: 'No more twots'});
  }
};

exports.deleteTwot = function (req, res, next) {
  const user = req.user;
  const index = req.params.index;
  if (user && user._id) {
    Twot.findOne({ user: user._id }, (err, existingTwots) => {
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