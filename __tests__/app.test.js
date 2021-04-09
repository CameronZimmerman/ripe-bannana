const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/db.js');

describe('ripe-bannana routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  });

  it('post adds an Actor to Actor table', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'John John',
        dob: 'Jan 1, 2020',
        pob: 'Johnsville'
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'John John',
          dob: expect.any(String),
          pob: 'Johnsville'
        })
      })
  })



});
