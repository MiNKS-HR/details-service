import request from 'supertest';
import app from '../server/app';

describe('Server side tests', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});