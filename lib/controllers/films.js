const { Router } = require('express');
const Films = require('../models/Films.js');
const Studio = require('../models/Studios.js');
const Reviews = require('../models/Reviews.js');
const Reviewers = require('../models/Reviewers.js');
const Actor = require('../models/Actors.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    Films.create(req.body)
      .then((film) => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Films.findAll({
      include: { model: Studio, attributes: ['id', 'name'] },
      attributes: ['title', 'id', 'released'],
    })
      .then((films) => res.send(films))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    // Films.findByPk(req.params.id, {
    //   include: [
    //     { model: Studio, attributes: ['id', 'name'] },
    //     { model: Actor, attributes: ['id', 'name']},
    //     {
    //       model: Reviews,
    //       attributes: ['id', 'rating', 'review'],
    //       include: { model: Reviewers, attributes: ['id', 'name'] },
    //     },
    //   ],
    //   attributes: ['title', 'id', 'released', 'cast'],
    // })
    //   .then((films) => {
    //     console.log(films);
    //     res.send(films);
    //   })
    //   .catch(next);
    Films.findOne({
      include: [
        {model: Actor, through: {attributes: []}, as: 'cast', attributes: ['name', 'id']},
        // Actor,
        { model: Studio, attributes: ['id', 'name'] },
        {
          model: Reviews,
          attributes: ['id', 'rating', 'review'],
          include: { model: Reviewers, attributes: ['id', 'name'] },
        },
      ],
      attributes: ['title', 'id', 'released'],
      where: {id: req.params.id}
    })
      .then((films) => {
        console.log(films);
        res.send(films);
      })
      .catch(next);
  });
