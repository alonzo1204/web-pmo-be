const { mysqlConnection } = require('../connections/mysql');
const bcrypt = require('bcrypt');

exports.getUserByCode = function (code) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT * from user where code = ?',
        }, [code], function (error, result, fields) {
            if (result && result.length > 0) {
                resolve(result[0]);
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

exports.registerUser = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code && user.password && user.firstname && user.lastname && user.career) {

            mysqlConnection.query({
                sql: 'SELECT * from user where code = ?',
            }, [user.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'ERR_USER_ALREADY_EXISTS',
                        message: 'El usuario con el código ' + user.code + ' ya existe en el sistema.'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO user (code, password, firstname, lastnamew, career) VALUES (?,?,?,?,?,?)',
                    }, [user.code, createHash(user.password), user.firstname, user.lastname, user.career], function (error, result, fields) {
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
                message: 'Send the complete body for register'
            })
        }
    })
}

var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}