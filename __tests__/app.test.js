const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/db.js');

describe('ripe-bannana routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  });
});
