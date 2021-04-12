const { Router } = require('express');
const Films = require('../models/Films.js');
const Studio = require('../models/Studios.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    Films.create(req.body)
      .then((film) => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Films.findAll({ include: {model: Studio, attributes: ['id', 'name']}, attributes: ['title', 'id', 'released'] })
      .then((films) => res.send(films))
      .catch(next);
  });
