import request from 'supertest';
import { expect } from 'chai';

const config = require('../../server/config');

describe('TwotController', () => {
  const url = `http://localhost:${process.env.PORT || 8080}`;

  // wait 2 seconds to allow server to restart, before running test cases
  before((done) => {
    setTimeout(done, 1500);
  });

  it('should fail if a user is not signed in', () => {
    request(url)
      .get('/twot')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(401); // Unauthorized
      });
  });

  describe('TwotController authenticated tests', () => {
    let token = '';

    before(async () => {
      // login as user testuser to get a token
      const profile = {
        email: 'testuser@example.com',
        password: 'test'
      };
      const resp = await request(url)
        .post('/signin')
        .send(profile);

      expect(resp.statusCode).to.equal(200); // OK
      expect(resp.header.token).to.exist; // Token received
      token = resp.header.token;
    });

    it('should respond with a list of twots', async () => {
      const resp = await request(url)
        .get('/twot')
        .set('Authorization', token);
      expect(resp.statusCode).to.equal(200); // OK
      expect(resp.body.twots).to.be.an('array').that.not.is.empty;
    });

    it('should fail if the profile does not exist', async () => {
      const twot = {
        text: 'My latest twot'
      };
      const resp = await request(url)
        .post('/twot')
        .set('Authorization', token)
        .send(twot);
      expect(resp.statusCode).to.equal(200); // OK
      expect(resp.body.twots).to.be.an('array');
      expect(resp.body.twots[0].text).to.equal('My latest twot');
      const addedId = resp.body.twots[0]._id;
      // next, remove immediately
      if (addedId) {
        const resp1 = await request(url)
          .delete(`/twot/${addedId}`)
          .set('Authorization', token);
        expect(resp1.statusCode).to.equal(200); // OK
        expect(resp1.body.message).to.equal('OK');
      }
    });
  });
});
