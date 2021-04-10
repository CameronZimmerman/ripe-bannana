const Reviews = require('../models/Reviews');
const Reviewer = require('../models/Reviewers');
const Films = require('../models/Films');

Reviewer.hasMany(Reviews);
Reviews.belongsTo(Reviewer);

// Reviews.hasOne(Film);
// Films.belongsTo(Reviews)