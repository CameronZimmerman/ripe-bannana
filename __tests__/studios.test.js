require('../lib/utils/relationships');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/db');
const seed = require('../data/seed');

describe('ripe-bannana studio routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  beforeEach(() => {
    return seed();
  });

  it('post adds a Studio to Studio table', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio Ghibli',
        city: 'Tokyo',
        state: 'N/A',
        country: 'Japan',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 4,
          name: 'Studio Ghibli',
          city: 'Tokyo',
          state: 'N/A',
          country: 'Japan',
        });
      });
  });
  it('get by id returns a scecific Studio by id', async () => {
    return request(app)
      .get('/api/v1/studios/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          country: expect.any(String),
          Films: expect.arrayContaining([
            { id: expect.any(Number), title: expect.any(String) },
          ]),
        });
      });
  });

  it('gets all studios', async () => {
    return request(app)
      .get('/api/v1/studios')
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: expect.any(Number),
              name: expect.any(String),
            },
          ])
        );
        expect(res.body.length).toEqual(3);
      });
  });

});
