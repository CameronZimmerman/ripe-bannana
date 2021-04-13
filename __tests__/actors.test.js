require('../lib/utils/relationships');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/db');
const seed = require('../data/seed');

describe('ripe-bannana actor routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  beforeEach(() => {
    return seed();
  });

  it('post adds an Actor to Actor table', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'John John',
        dob: 'Jan 1, 2020',
        pob: 'Johnsville',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 109,
          name: 'John John',
          dob: expect.any(String),
          pob: 'Johnsville',
        });
      });
  });

  it('get by id returns a scecific Actor by id', async () => {
    return request(app)
      .get('/api/v1/actors/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: expect.any(String),
          dob: expect.any(String),
          pob: expect.any(String),
          films: [
            {
              id: expect.any(Number),
              title: expect.any(String),
              released: expect.any(Number),
            },
          ],
        });
      });
  });

  it('gets all actors', async () => {
    return request(app)
      .get('/api/v1/actors')
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              name: expect.any(String),
              id: expect.any(Number),
            },
          ])
        );
      });
  });

});
