const { mysqlConnection } = require('../connections/mysql');


exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT * from portfolio',
        }, function (error, result, fields) {
            if (result) {
                const arr = result;
                mysqlConnection.query({
                    sql: 'SELECT Count(*) as Cantidad from portfolio',
                }, function (error, result2, fields) {
                    arr.push(result2[0])
                    resolve(arr);
                })
            } else {
                resolve(null);
            }
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}