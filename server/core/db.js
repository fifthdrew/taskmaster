const knex = require('knex')(require('../knexfile.js'));

class Db {
    get knex() { return knex };
}

module.exports = Db;
