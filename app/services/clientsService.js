const { mysqlConnection } = require('../connections/mysql');

exports.getClients = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT id, name, lastname, ocupation, created_at from clients',
        }, function (error, result, fields) {
            if (result) {
                resolve(result);
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

exports.getClientById = function (clientId) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT id, name, lastname, ocupation, created_at from clients where id = ?',
        }, [clientId], function (error, result, fields) {
            if (result) {
                resolve(result);
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

exports.saveClient = function (client) {
    return new Promise(function (resolve, reject) {
        if (client.name && client.lastname && client.ocupation) {
            mysqlConnection.query({
                sql: 'INSERT INTO clients (name, lastname, ocupation) VALUES (?,?,?)',
            }, [client.name, client.lastname, client.ocupation], function (error, result, fields) {
                if (result) {
                    resolve(result);
                }
                if (error) {
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                    })
                }
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for client'
            })
        }
    })
}