import request from 'supertest';
import { expect } from 'chai';

const config = require('../../server/config');

describe('AuthController', () => {
  const url = `http://localhost:${process.env.PORT || 8080}`;

  it('should reject to login with unknown user (make sure API server is running on 8080)', () => {
    const profile = {
      email: 'unknown@example.com',
      password: 'testtest'
    };
    request(url)
      .post('/signin')
      .send(profile)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(401); // Unauthorized
      });
  });

  describe('AuthController authenticated', () => {

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

    it('should respond with the current user', async () => {
      const resp = await request(url)
        .get('/me')
        .set('Authorization', token);
      expect(resp.statusCode).to.equal(200); // OK
      expect(resp.body.email).to.equal('testuser@example.com');
    });

    it('should fail if the profile misses an email', async () => {
      const resp = await request(url)
        .get('/profile')
        .set('Authorization', token);
      expect(resp.statusCode).to.equal(404); // OK
    });

    it('should fail if the profile does not exist', async () => {
      const resp = await request(url)
        .get('/profile/unknown@example.com')
        .set('Authorization', token);
      expect(resp.statusCode).to.equal(404); // OK
    });

    it('should succeed if the profile email exists', async () => {
      const resp = await request(url)
        .get('/profile/testuser@example.com')
        .set('Authorization', token);
      expect(resp.statusCode).to.equal(200); // OK
      expect(resp.body.email).to.equal('testuser@example.com');
    });


  });

});
