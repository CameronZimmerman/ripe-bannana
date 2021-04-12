const { Router } = require('express');
const Studio = require('../models/Studios');
const Films = require('../models/Films');
module.exports = Router()

    .post('/', (req, res, next) => {
        Studio.create(req.body)
            .then((studio) => res.send(studio))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Studio.findAll({
            attributes: ['id', 'name']
        })
            .then((studios) => res.send(studios))
            .catch(next);
    })
    
    .get('/:id', (req, res, next) => {
        Studio.findByPk(req.params.id,
            {include:  {model: Films, attributes: ['id', 'title']}})
            .then((studio) => res.send(studio))
            .catch(next);
    })
