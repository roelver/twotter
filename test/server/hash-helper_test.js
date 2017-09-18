import mongoose from 'mongoose';
import { expect } from 'chai';

import config from '../../server/config';
import { collectHashtags, processHashesOnAdd, getHashtag, processHashesOnDelete } from '../../server/services/hash-helper';


describe('HashHelper', () => {

  before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.mongodb, {
      useMongoClient: true
    })
      .then(() => done());
  });

  after((done) => {
    mongoose.disconnect().then(() => done());
  });

  it('should correctly scan for hashtags', () => {
    const text = 'This #is a line with #three3 hashtags in #it';
    const hashtags = collectHashtags(text);
    expect(hashtags).to.be.an('array').that.not.is.empty;
    expect(hashtags[0]).to.equal('is');
    expect(hashtags[1]).to.equal('three3');
    expect(hashtags[2]).to.equal('it');
  });

  it('should ignore hashtags if not in twots ', async () => {
    const twot = {
      _id: '59bfca3c58d3d66e8c486d2b',
      text: 'This is a line without hashtags in it'
    };
    processHashesOnAdd(twot)
      .then((data) => assert.fail('should be rejected'))
      .catch((err) => err);  // OK, promise was rejected
  });

  it('should add and delete for hashtags', async () => {
    const twot = {
      _id: '59bfca3c58d3d66e8c486d2b',
      text: 'This is a line with #two2 #hushtags in it'
    };
    await processHashesOnAdd(twot);
    let hash = await getHashtag('two2');
    expect(hash.refs).to.be.an('array').that.not.is.empty;
    expect(hash.refs).to.contain(twot._id);
    hash = await getHashtag('hushtags');
    expect(hash.refs).to.be.an('array').that.not.is.empty;
    expect(hash.refs).to.contain(twot._id);

    await processHashesOnDelete(twot);
    hash = await getHashtag('hushtags');
    expect(hash).to.be.an('null');
  });

});
