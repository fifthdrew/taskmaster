const assert = require('assert');

const Context = require('../../core/context');

describe('Context', () => {
    it('sanity check', () => {
        const ctx = new Context();

        assert(ctx);
        assert(ctx.db);
    });
});
