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
      // where: { review: { [Op.is]: !null } },
      order: [['rating', 'DESC']],
      limit: 100
    })
      .then((review) => res.send(review.rows))
      .catch(next)
  })

