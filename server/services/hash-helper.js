const Hashtag = require('../models/hashtag');

async function addHash(hash, twotId) {
  const hashFound = await Hashtag.findOne({ text: hash.toLowerCase() });
  if (hashFound) {
    // Ignore duplicates
    if (hashFound.refs.indexOf(twotId) < 0) {
      hashFound.refs.push(twotId);
      await hashFound.save();
    }
  } else {
    const refs = [twotId];
    const newHash = new Hashtag({
      text: hash.toLowerCase(),
      refs
    });
    await newHash.save();
  }
}


async function deleteHash(hash, twotId) {
  const hashFound = await Hashtag.findOne({ text: hash.toLowerCase() });
  if (hashFound) {
    const ix = hashFound.refs.indexOf(twotId);
    if (ix >= 0) {
      if (hashFound.refs.length > 1) {
        hashFound.refs.splice(ix, 1);
        await hashFound.save();
      } else {
        await hashFound.remove();
      }
    }
  }
}

async function getHashtag(hash) {
  const data = await Hashtag.findOne({ text: hash.toLowerCase() });
  return data;
}

function collectHashtags(text) {
  const result = [];
  const filter = /(?:#)([a-zA-Z0-9]*)(?:\s|$)/g;
  let match = filter.exec(text);
  while (match != null) {
    result.push(match[1]);
    match = filter.exec(text);
  }
  return result;
}

async function processHashesOnAdd(twot) {
  return new Promise((resolve, reject) => {
    const hashtags = collectHashtags(twot.text);
    if (hashtags && hashtags.length > 0) {
      Promise.all(
        hashtags.map((hash) => {
          const promise = addHash(hash, twot._id);
          return promise;
        }))
        .then(() => {
          resolve();
        })
        .catch(err => console.log('Promise.all fail', err));
    } else {
      resolve();
    }
  });
}

async function processHashesOnDelete(twot) {
  return new Promise((resolve, reject) => {
    const hashtags = collectHashtags(twot.text);
    if (hashtags && hashtags.length > 0) {
      Promise.all(
        hashtags.map((hash) => {
          const promise = deleteHash(hash, twot._id);
          return promise;
        }))
        .then(() => {
          resolve();
        })
        .catch(err => console.log('Promise.all fail', err));
    }
  });
}

module.exports = {
  processHashesOnDelete,
  processHashesOnAdd,
  collectHashtags,
  getHashtag,
  deleteHash,
  addHash
};
