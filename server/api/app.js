const express = require('express');
const bodyPasser = require('body-parser');

const logger = require('../core/logger');
const Context = require('../core/context');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST');

    next();
});

app.use(express.json());

app.get('/', (req, res) => res.send('Hello!'));

app.post('/users', async(req, res) => {
    const ctx  = new Context();
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).send({
            ok: false,
            message: 'Missing required info.'
        });
    }

    try {
        const user = await ctx.user.create(name, email, password); 
        res.status(201).send({ ok: true, id: user.id });
    } catch(ex) {
        if(ex.code == '23505') {
            res.status(400).send({
                ok: false,
                message: 'e-mail already registered.'
            });
        }
        logger.error(ex);
        res.status(500).send({ 
            ok: false,
            message: 'We, sorry, try again later!'
        });
    }
});

app.listen(process.env.HTTP_PORT, () => {
    logger.info(`app is running at http://localhost:${process.env.HTTP_PORT}`);
});
