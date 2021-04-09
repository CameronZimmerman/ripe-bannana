const { Router } = require('express');
const Reviewer = require('../models/Reviewers');

module.exports = Router()

    .post('/', (req, res, next) => {
        Reviewer.create(req.body)
            .then((reviewer) => res.send(reviewer))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Reviewer.findAll()
            .then((reviewers) => res.send(reviewers))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Reviewer.findByPk(req.params.id)
            .then((reviewer) => res.send(reviewer))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Reviewer.update(req.body, { where: {id: req.params.id}, returning: true })
            .then((reviewers) => res.send(reviewers[1][0]))
            .catch(next);
    })
    