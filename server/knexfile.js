require('./dotenv');

module.exports = {
    client: "pg",
    connection: {
        host: process.env.PSQL_HOST,
        user: process.env.PSQL_USER,
        database: process.env.PSQL_DATABASE,
        password: process.env.PSQL_PASSWORD
    }
};
