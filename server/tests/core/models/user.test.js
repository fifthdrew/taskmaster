const assert = require('assert');

const Context = require('../../../core/context');
const UserModel = require('../../../core/models/user');

describe('User model', () => {
    it('sanity check', () => {
        const userModel = new UserModel(new Context());

        assert(userModel);
        assert(userModel.ctx);
        assert(userModel.db);
    });
    
    it('Create user', async() => {
        const userModel = new UserModel(new Context());
        const email = `${new Date().getTime()}@tests.com`;

        const user = await userModel.create('João', email, '123'); 

        assert(user);
        assert(user.id);

        await userModel.db.knex('user').where({ email }).del();
    });

    after(() => {
        return new Context().db.knex.destroy();
    });
});
