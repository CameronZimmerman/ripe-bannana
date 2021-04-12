const { Router } = require('express');
const Reviews = require('../models/Reviews');
const Film = require('../models/Films');
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
      limit: 100,
      include: {model: Film, attributes:['id', 'title']}
    })
      .then((review) => res.send(review.rows))
      .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    Reviews.destroy({
      where: {
          id: req.params.id
      }
    })
      .then(() => res.send({ success: '👍' }))
      .catch(next);
  })