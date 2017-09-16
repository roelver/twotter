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
        if (existingTwots) {
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
        return next(err);
      }
      for (let i = 0; i < results.length && counter < end; i++) {
        const row = results[i];
        if (counter >= start || row.twots.length + counter <= end) {
          if (data.id === null) {
            data.id = row['_id'];
          }
          const begin = Math.max(start - counter, 0);
          const until = Math.min(end - counter, row.twots.length);
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

exports.deleteTwot = async (req, res, next) => {
  const user = req.user;
  const index = req.params.index;
  if (user && user['_id']) {
    await Twot.find({ user }).sort('-seqno' ).exec((err, results) => {
      if (err) {
        return next(err);
      }
      let counter = 0;
      let deleted = false;
      if (results) {
        for (let i = 0; i < results.length && !deleted; i++) {
          const row = results[i];
          console.log('To delete', index, 'Row', i, 'Counter', counter);
          if (index >= counter && index < row.twots.length + counter) {
            console.log('Deleting', 'Row', i, 'item', (index - counter));
            row.twots.splice(index - counter, 1);
            deleted = true;
            if (row.twots.length == 0) {
              row.remove()
                .then(data => res.json({ message: 'OK' }))
                .catch(err1 => res.status(500).send({ error: err1 }));
            } else {
              row.save()
                .then(data => res.json({ message: 'OK' }))
                .catch(err1 => res.status(500).send({ error: err1 }));
            }
          }
          counter += row.twots.length;
        }
      } else {
        return res.status(404).send({ message: 'No twots' });
      }
    });
  } else {
    res.status(404).send({ message: 'No twots' });
  }
};
