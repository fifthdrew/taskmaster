const bcrypt = require('bcrypt');

const BaseModel = require('./base');

class UserModel extends BaseModel {
    async create(name, email, password){
        const hashedPassword = await bcrypt.hash(password, 7);

        const rows = await this.db
            .knex('user')
            .insert({ name, email, password: hashedPassword })
            .returning('*');

        return rows[0];
    }
}

module.exports = UserModel;
