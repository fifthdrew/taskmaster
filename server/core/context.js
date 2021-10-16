const Db = require('./db');
const UserModel = require('./models/user');

class Context {
    constructor() {
        this.db = new Db();
        this.user = new UserModel(this);
    }
}

module.exports = Context;
