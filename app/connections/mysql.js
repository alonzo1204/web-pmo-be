var mysql = require('mysql2');
const { database } = require('../constants');
var connection = mysql.createConnection({
    host: database.HOST,
    user: database.USER,
    password: database.PASSWORD,
    database: database.DATABASE,
    supportBigNumbers: true,
    bigNumberStrings: true
});

module.exports = {
    mysqlConnection: connection
};