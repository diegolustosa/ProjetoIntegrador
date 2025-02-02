const knex = require('knex');

const dbconector = knex ({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'gestao_usuarios',
        port: 3306
    }
});
module.exports = dbconector;