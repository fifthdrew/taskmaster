const Db = require('./db');

class Context {
    constructor() {
        this.db = new Db();
    }
}

module.exports = Context;
