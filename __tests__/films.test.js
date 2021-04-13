require('../lib/utils/relationships');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/db');
const seed = require('../data/seed');


describe('ripe-bannana film routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  beforeEach(() => {
    return seed();
  });
 
  it('Creates a Film on the Film table via POST', async () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Its a Movie',
        StudioId: 1,
        released: 1990,
        cast: [
          {
            name: 'George',
            pob: 'Georgia',
            dob: 1990,
          },
        ],
      })
      .then((res) => {
        expect(res.body).toEqual({
          title: 'Its a Movie',
          StudioId: 1,
          released: 1990,
          cast: [
            {
              name: 'George',
              id: 109,
              pob: 'Georgia',
              dob: expect.any(String),
            },
          ],
          id: 10,
        });
      });
  });

  it('Gets all films from the film table via GET', async () => {
    return request(app)
      .get('/api/v1/films')
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: expect.any(Number),
            Studio: { id: expect.any(Number), name: expect.any(String) },
            title: expect.any(String),
            released: expect.any(Number),
          },
        ]));
      });
  });

  it('Gets a film by id from the film table via GET', async () => {
    return request(app)
      .get('/api/v1/films/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          Studio: { id: expect.any(Number), name: expect.any(String) },
          title: expect.any(String),
          released: expect.any(Number),
          cast: expect.arrayContaining([
            {
              id: expect.any(Number),
              name: expect.any(String),
            },
          ]),
          Reviews: expect.arrayContaining([
            {
              id: expect.any(Number),
              rating: expect.any(Number),
              review: expect.any(String),
              Reviewer: { id: expect.any(Number), name: expect.any(String) },
            },
          ]),
        });
      });
  });
});
