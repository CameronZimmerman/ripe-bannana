const Reviews = require('../models/Reviews');
const Reviewer = require('../models/Reviewers');
const Film = require('../models/Films');
const Actors = require('../models/Actors');
const Studio = require('../models/Studios');

Reviewer.hasMany(Reviews, { onDelete: 'RESTRICT' });
Reviews.belongsTo(Reviewer);

Film.hasMany(Reviews);
Reviews.belongsTo(Film);

Actors.belongsToMany(Film, { through: 'FilmActors' });
const FilmActorsAssociation = Film.belongsToMany(Actors, {
  through: 'FilmActors',
  as: 'cast',
});

Studio.hasMany(Film);
Film.belongsTo(Studio);

module.exports = { FilmActorsAssociation };
