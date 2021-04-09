const request = require('supertest');
const app = require('../lib/app');
const Actor = require('../lib/models/Actors');
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
          dob: expect.any(String),
          pob: 'Johnsville'
        }, {
          id: 2,
          name: 'Jimmy John',
          dob: expect.any(String),
          pob: 'Johnsville'
        }])
      })
  })



});
