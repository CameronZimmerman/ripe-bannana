const Reviews = require('../models/Reviews');
const Reviewer = require('../models/Reviewers');
const Film = require('../models/Films');
const Actors = require('../models/Actors');
const Studio = require('../models/Studios');


Reviewer.hasMany(Reviews, { onDelete: 'RESTRICT' });
Reviews.belongsTo(Reviewer);

// Reviews.hasOne(Film);
// Films.belongsTo(Reviews)

Actors.belongsToMany(Film, {through: 'FilmActors'});
Film.belongsToMany(Actors, {through: 'FilmActors'});

Studio.hasMany(Film);
Film.belongsTo(Studio);