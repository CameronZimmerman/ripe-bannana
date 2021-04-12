const { Router } = require('express');
const Reviews = require('../models/Reviews');
const { Op } = require('sequelize');

module.exports = Router()

  .post('/', (req, res, next) => {
    Reviews.create(req.body)
      .then((review) => res.send(review))
      .catch(next)
  })

  .get('/', (req, res, next) => {
    Reviews.findAndCountAll({
      attributes: ['id', 'rating', 'review'],
      order: [['rating', 'DESC']],
      limit: 100
    })
      .then((review) => res.send(review.rows))
      .catch(next)
  })

