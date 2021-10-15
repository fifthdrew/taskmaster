const assert = require('assert');

const Db = require('../../core/db');

describe('Db', () => {
    it('sanity check', () => {
        const db = new Db();

        assert(db);
        assert(db.knex);
    });

    it('db health check', async() => {
        const db = new Db();
        const result = await db.knex.raw('SELECT 1 AS test');

        assert(result);
        assert(result.rows);

        assert.strictEqual(result.rows.length, 1);
        assert.strictEqual(result.rows[0].test, 1);
    });

    after(() => {
        return new Db().knex.destroy();
    });
});
