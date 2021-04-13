require('../lib/utils/relationships');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/db');
const seed = require('../data/seed');

describe('ripe-bannana reviewer routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  beforeEach(() => {
    return seed();
  });

  it('Creates a Review on the Review table via POST', async () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        ReviewerId: 1,
        review: 'It was awesome',
        FilmId: 1,
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 151,
          rating: 4,
          ReviewerId: 1,
          review: 'It was awesome',
          FilmId: 1,
        });
      });
  });

  it('Gets all Reviews from the Review table via GET', async () => {
    return request(app)
      .get('/api/v1/reviews')
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: expect.any(Number),
            rating: expect.any(Number),
            review: expect.any(String),
            Film: { id: expect.any(Number), title: expect.any(String) },
          }
        ]));
        expect(res.body.length).toEqual(100);
        expect(res.body[0].rating > res.body[99].rating).toEqual(true)
      });
  });

  it('delete Review data on the Review table', async () => {
    return request(app)
      .delete('/api/v1/reviews/1')
      .then((res) => {
        expect(res.body).toEqual({
          success: '👍',
        });
      });
  });


});
