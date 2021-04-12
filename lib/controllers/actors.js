const { Router } = require('express');
const Actor = require('../models/Actors');
const Film = require('../models/Films');
module.exports = Router()

    .post('/', (req, res, next) => {
        Actor.create(req.body)
            .then((actor) => res.send(actor))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Actor.findAll({
            attributes: ['id', 'name']
        })
            .then((actors) => res.send(actors))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor.findByPk(req.params.id,
            {include: {model: Film, through: {attributes: []}, attributes: ['title', 'id', 'released'], as: 'films'}}
            )
            .then((actor) => res.send(actor))
            .catch(next);
    })