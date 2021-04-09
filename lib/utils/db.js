const { Sequilize } = require('sequilize');

const db = new Sequilize(process.env.DATABASE_URL);

module.exports = db;
