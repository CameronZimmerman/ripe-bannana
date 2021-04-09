const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/models/Actors');
const Studio = require('../lib/models/Studios');
const Reviewer = require('../lib/models/Reviewers');
const db = require('../lib/utils/db.js');

describe('ripe-bannana routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  });

// Actors
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

  it('get by id returns a scecific Actor by id', async () => {
    await Actor.create({
      name: 'John John',
      dob: 'Jan 1, 2020',
      pob: 'Johnsville'
    })
    return request(app)
      .get('/api/v1/actors/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'John John',
          dob: expect.any(String),
          pob: 'Johnsville'
        })
      })
  })

  it('gets all actors', async () => {
    await Actor.bulkCreate([{
      name: 'John John',
      dob: 'Jan 1, 2020',
      pob: 'Johnsville'
    },
    {
      name: 'Jimmy John',
      dob: 'Jan 1, 2000',
      pob: 'Johnsville'
    }
    ])
    return request(app)
      .get('/api/v1/actors')
      .then((res) => {
        expect(res.body).toEqual([{
          id: 1,
          name: 'John John',
        }, {
          id: 2,
          name: 'Jimmy John',
        }])
      })
  })

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
        })
      })
  })
  it('get by id returns a scecific Studio by id', async () => {
    await Studio.create({
      name: 'Studio Ghibli',
      city: 'Tokyo',
      state: 'N/A',
      country: 'Japan',
    })
    return request(app)
      .get('/api/v1/studios/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Studio Ghibli',
          city: 'Tokyo',
          state: 'N/A',
          country: 'Japan',
        })
      })
  })

  it('gets all studios', async () => {
    await Studio.bulkCreate([{
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
    }
    ])
    return request(app)
      .get('/api/v1/studios')
      .then((res) => {
        expect(res.body).toEqual([{
          id: 1,
          name: 'Studio Ghibli'
        }, {
          id: 2,
          name: 'Disney'
        }])
      })
  })

// Reviewer
  it('post adds a Reviewer to Reviewer table', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Bob Ooblong',
        company: 'Dragonball Reviews'
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Bob Ooblong',
          company: 'Dragonball Reviews'
        })
      })
  })

  it('get by id returns a scecific Reviewer by id', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews'
    })
    return request(app)
      .get('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Bob Ooblong',
          company: 'Dragonball Reviews'
        })
      })
  })

  it('gets all reviewers', async () => {
    await Reviewer.bulkCreate([{
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews'
    },
    {
      name: 'Carrot',
      company: 'Dragonball Reviews'
    }
    ])
    return request(app)
      .get('/api/v1/reviewers')
      .then((res) => {
        expect(res.body).toEqual([{
          id: 1,
          name: 'Bob Ooblong',
          company: 'Dragonball Reviews'
        }, {
          id: 2,
          name: 'Carrot',
          company: 'Dragonball Reviews'
        }])
      })
  })

  it('put changes a Reviewers data on the Reviewer table', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews'
    });
    return request(app)
      .put('/api/v1/reviewers/1')
      .send({
        name: 'Bob Carrot',
        company: 'Dragonball Reviews'
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Bob Carrot',
          company: 'Dragonball Reviews'
        })
      })
  })

  it('delete a Reviewers data on the Reviewer table if there are no reviews', async () => {
    await Reviewer.create({
      name: 'Bob Ooblong',
      company: 'Dragonball Reviews',
      reviews: 'test'
    });
    return request(app)
      .delete('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({
          success: '👍'
        })
      })
  })

});
