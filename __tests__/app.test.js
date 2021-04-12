require('../lib/utils/relationships');
const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/models/Actors');
const Studio = require('../lib/models/Studios');
const Reviewer = require('../lib/models/Reviewers');
const Film = require('../lib/models/Films');
const db = require('../lib/utils/db.js');
const Reviews = require('../lib/models/Reviews');

describe('ripe-bannana routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  // Actors
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
          id: 1,
          name: 'John John',
          dob: expect.any(String),
          pob: 'Johnsville',
        });
      });
  });

  it('get by id returns a scecific Actor by id', async () => {
    await Actor.create({
      name: 'John John',
      dob: 'Jan 1, 2020',
      pob: 'Johnsville',
    });
    return request(app)
      .get('/api/v1/actors/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'John John',
          dob: expect.any(String),
          pob: 'Johnsville',
        });
      });
  });

  it('gets all actors', async () => {
    await Actor.bulkCreate([
      {
        name: 'John John',
        dob: 'Jan 1, 2020',
        pob: 'Johnsville',
      },
      {
        name: 'Jimmy John',
        dob: 'Jan 1, 2000',
        pob: 'Johnsville',
      },
    ]);
    return request(app)
      .get('/api/v1/actors')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'John John',
          },
          {
            id: 2,
            name: 'Jimmy John',
          },
        ]);
      });
  });

  // Studio
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
          id: 1,
          name: 'Studio Ghibli',
          city: 'Tokyo',
          state: 'N/A',
          country: 'Japan',
        });
      });
  });
  it('get by id returns a scecific Studio by id', async () => {
    await Studio.create({
      name: 'Studio Ghibli',
      city: 'Tokyo',
      state: 'N/A',
      country: 'Japan',
    });
    return request(app)
      .get('/api/v1/studios/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Studio Ghibli',
          city: 'Tokyo',
          state: 'N/A',
          country: 'Japan',
        });
      });
  });

  it('gets all studios', async () => {
    await Studio.bulkCreate([
      {
        name: 'Studio Ghibli',
        city: 'Tokyo',
        state: 'N/A',
        country: 'Japan',
      },
      {
        name: 'Disney',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
      },
    ]);
    return request(app)
      .get('/api/v1/studios')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Studio Ghibli',
          },
          {
            id: 2,
            name: 'Disney',
          },
        ]);
      });
  });

  // Reviewer
  it('post adds a Reviewer to Reviewer table', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Bob Ooblong',
        company: 'Dragonball Reviews',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Bob Ooblong',
          company: 'Dragonball Reviews',
        });
      });
  });

  it('get by id returns a scecific Reviewer by id', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
    await Reviews.create({
      rating: 5,
      review: 'it was great',
      ReviewerId: 1,
    });
    return request(app)
      .get('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Bob Ooblong',
          company: 'Dragonball Reviews',
          Reviews: [
            {
              rating: 5,
              review: 'it was great',
              ReviewerId: 1,
              id: 1,
            },
          ],
        });
      });
  });

  it('gets all reviewers', async () => {
    await Reviewer.bulkCreate([
      {
        name: 'Bob Ooblong',
        company: 'Dragonball Reviews',
      },
      {
        name: 'Carrot',
        company: 'Dragonball Reviews',
      },
    ]);
    return request(app)
      .get('/api/v1/reviewers')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            name: 'Bob Ooblong',
            company: 'Dragonball Reviews',
          },
          {
            id: 2,
            name: 'Carrot',
            company: 'Dragonball Reviews',
          },
        ]);
      });
  });

  it('put changes a Reviewers data on the Reviewer table', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
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
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });

    return request(app)
      .delete('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({
          success: '👍',
        });
      });
  });

  it('delete a Reviewers data on the Reviewer table if there are no reviews', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
    await Reviews.bulkCreate([
      {
        rating: 3,
        ReviewerId: 1,
        review: 'It was awesome',
        FilmId: 1,
      },
    ]);

    return request(app)
      .delete('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({
          message:
            'update or delete on table "Reviewers" violates foreign key constraint "Reviews_ReviewerId_fkey" on table "Reviews"',
          status: 500,
        });
      });
  });

  // Review
  it('Creates a Review on the Review table via POST', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
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
          id: 1,
          rating: 4,
          ReviewerId: 1,
          review: 'It was awesome',
          // FilmId: 1,
        });
      });
  });

  it('Gets all Reviews from the Review table via GET', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
    await Reviews.bulkCreate([
      {
        rating: 3,
        ReviewerId: 1,
        review: 'It was awesome',
        FilmId: 1,
      },
      {
        rating: 4,
        ReviewerId: 1,
        review: 'It was super awesome',
        FilmId: 1,
      },
    ]);

    return request(app)
      .get('/api/v1/reviews')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 2,
            rating: 4,
            review: 'It was super awesome',
            // FilmId: 1,
          },
          {
            id: 1,
            rating: 3,
            review: 'It was awesome',
            // FilmId: 1,
          },
        ]);
      });
  });

  it('delete Review data on the Review table', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
    await Reviews.bulkCreate([
      {
        rating: 3,
        ReviewerId: 1,
        review: 'It was awesome',
        FilmId: 1,
      },
    ]);
    return request(app)
      .delete('/api/v1/reviews/1')
      .then((res) => {
        expect(res.body).toEqual({
          success: '👍',
        });
      });
  });

  // Films
  it('Creates a Film on the Film table via POST', async () => {
    await Studio.create({
      name: 'Studio Ghibli',
      city: 'Tokyo',
      state: 'N/A',
      country: 'Japan',
    });
    await Actor.create({
      name: 'John John',
      dob: 'Jan 1, 2020',
      pob: 'Johnsville',
    });
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Its a Movie',
        StudioId: 1,
        released: 1990,
        cast: [
          {
            role: 'George',
            actorId: 1,
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
              role: 'George',
              actorId: 1,
            },
          ],
          id: 1,
        });
      });
  });

  it('Gets all films from the film table via GET', async () => {
    await Studio.create({
      name: 'Studio Ghibli',
      city: 'Tokyo',
      state: 'N/A',
      country: 'Japan',
    });
    await Actor.create({
      name: 'John John',
      dob: 'Jan 1, 2020',
      pob: 'Johnsville',
    });
    await Film.create({
      title: 'Its a Movie',
      StudioId: 1,
      released: 1990,
      cast: [
        {
          role: 'George',
          actorId: 1,
        },
      ],
    });
    return request(app)
      .get('/api/v1/films')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            Studio: { id: 1, name: 'Studio Ghibli' },
            title: 'Its a Movie',
            released: 1990,
          },
        ]);
      });
  });

  it.only('Gets a film by id from the film table via GET', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
    });
    await Reviews.bulkCreate([
      {
        rating: 3,
        ReviewerId: 1,
        review: 'It was awesome',
        FilmId: 1,
      },
    ]);
    await Studio.create({
      name: 'Studio Ghibli',
      city: 'Tokyo',
      state: 'N/A',
      country: 'Japan',
    });
    await Actor.create({
      name: 'John John',
      dob: 'Jan 1, 2020',
      pob: 'Johnsville',
    });
    await Film.create({
      title: 'Its a Movie',
      StudioId: 1,
      released: 1990,
      cast: [
        {
          role: 'George',
          actorId: 1,
        },
      ],
    });
    return request(app)
      .get('/api/v1/films/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          Studio: { id: 1, name: 'Studio Ghibli' },
          title: 'Its a Movie',
          released: 1990,
          cast: [
            {
              id: 1,
              role: 'George',
              Actor: { id: 1, name: 'John John' },
            },
          ],
          Reviews: [
            {
              id: 1,
              rating: 5,
              review: 'it was great. John John was magical',
              Reviewer: { id: 1, name: 'Bob Ooblong' },
            },
          ],
        });
      });
  });
});
