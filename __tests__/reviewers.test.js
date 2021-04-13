require('../lib/utils/relationships');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/db');
const seed = require('../data/seed');

const Reviewers = require('../lib/models/Reviewers');
const Reviews = require('../lib/models/Reviews');


describe('ripe-bannana reviewer routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  beforeEach(() => {
    return seed();
  });

  it('post adds a Reviewer to Reviewer table', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Bob Ooblong',
        company: 'Dragonball Reviews',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 21,
          name: 'Bob Ooblong',
          company: 'Dragonball Reviews',
        });
      });
  });

  it('get by id returns a scecific Reviewer by id', async () => {
    return request(app)
      .get('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: expect.any(String),
          company: expect.any(String),
          Reviews: expect.arrayContaining([
            {
              rating: expect.any(Number),
              review: expect.any(String),
              ReviewerId: 1,
              FilmId: expect.any(Number),
              id: expect.any(Number),
              Film: { id: expect.any(Number), title: expect.any(String) },
            },
          ]),
        });
      });
  });

  it('gets all reviewers', async () => {
    return request(app)
      .get('/api/v1/reviewers')
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: expect.any(Number),
              name: expect.any(String),
              company: expect.any(String),
            },
          ])
        );
      });
  });

  it('put changes a Reviewers data on the Reviewer table', async () => {
    return request(app)
      .put('/api/v1/reviewers/1')
      .send({
        name: 'Bob Carrot',
        company: 'Dragonball Reviews',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Bob Carrot',
          company: 'Dragonball Reviews',
        });
      });
  });

  it('delete a Reviewers data on the Reviewer table if there are no reviews', async () => {
    await Reviewers.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });

    return request(app)
      .delete('/api/v1/reviewers/21')
      .then((res) => {
        expect(res.body).toEqual({
          success: '👍',
        });
      });
  });

  it('delete a Reviewers data on the Reviewer table if there are no reviews', async () => {
    await Reviewers.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
    await Reviews.bulkCreate([
      {
        rating: 3,
        ReviewerId: 21,
        review: 'It was awesome',
        FilmId: 1,
      },
    ]);

    return request(app)
      .delete('/api/v1/reviewers/21')
      .then((res) => {
        expect(res.body).toEqual({
          message:
            'update or delete on table "Reviewers" violates foreign key constraint "Reviews_ReviewerId_fkey" on table "Reviews"',
          status: 500,
        });
      });
  });

});
