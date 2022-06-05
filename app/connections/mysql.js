const Sequelize = require('sequelize')
var mysql = require('mysql2');
const { database } = require('../constants');

const sequelize = new Sequelize(database.DATABASE, database.USER, database.PASSWORD, {
    host: database.HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
  });
  

var mysqlConnection = mysql.createConnection({
    host: database.HOST,
    user: database.USER,
    password: database.PASSWORD,
    database: database.DATABASE,
    supportBigNumbers: true,
    bigNumberStrings: true
});

module.exports = {
    sequelize,
    mysqlConnection
};