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
//cambios a role y sacar career y cambios al query
exports.registerUser = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code && user.password && user.firstname && user.lastname) {

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
                        sql: 'INSERT INTO user (`code`, `password`, `firstname`, `lastname`) VALUES (?,?,?,?)',
                    }, [user.code, createHash(user.password), user.firstname, user.lastname], function (error, result, fields) {
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

exports.changePassword = function (user) {
    return new Promise(function (resolve, reject) {
        if(user.code && user.password && user.newPassword){
            mysqlConnection.query({
                sql: 'SELECT * from user where code = ?',
            }, [user.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    var newPassword = user.newPassword;
                    var oldPassword = user.password;
                    if(newPassword==oldPassword){
                        reject({
                            codeMessage: 'ER_SAME_PASSWORD',
                            message: "Las contraseñas son iguales"
                        })
                    }
                    console.log(result[0].password);
                    const isValid = bcrypt.compareSync(oldPassword,result[0].password);
                    console.log(isValid);
                    if(!isValid){
                        reject({
                            codeMessage: 'ER_PASSWORD_INCORRECT',
                            message: "Contraseña no coincide"
                        })
                    }else{
                        mysqlConnection.query({
                            sql: 'UPDATE user SET password=? WHERE code = ?',
                        }, [createHash(newPassword),user.code], function (error, result, fields) {
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
                }else{
                    reject({
                        codeMessage: 'ERR_USER_NOT_FOUND',
                        message: 'El usuario con el código ' + user.code + ' no existe en el sistema.'
                    })
                }
            })    
        }else{
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