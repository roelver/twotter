const Hashtag = require('../models/hashtag');

exports.addHashtag = function (req, res, next) {
  const { text, _id } = req.body;
  Hashtag.findOne({ text: text.toLowerCase() }, (err, hashFound) => {
    if (err) return next(err);
    if (hashFound) {
      // Ignore duplicates
      if (hashFound.refs.indexOf(_id) < 0) {
        hashFound.refs.push(_id);
        hashFound.save()
          .then(h => res.json(h));
      } else {
        return res.status(304).send('Ignored');
      }
    } else {
      const refs = [_id];
      const newHash = new Hashtag({
        text: text.toLowerCase(),
        refs
      });
      newHash.save().then(h => res.json(h));
    }
    return null;
  });
};
