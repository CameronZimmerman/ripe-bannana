const { Router } = require('express');
const Reviews = require('../models/Reviews');

module.exports = Router().post('/', (req, res, next) => {
  Reviews.create(req.body)
    .then((review) => res.send(review))
    .catch(next);
});
