const { mysqlConnection } = require('../connections/mysql');

exports.getFullList = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `select 
                u.id,
                u.code, 
                u.firstname, 
                u.lastname, 
                u.active, 
                u.weighted_average, 
                r.id as 'role.id', 
                r.name as 'role.name',
                c.id as 'carrera.codigo de la carrera',
                c.name as 'carrera.nombre de la carrera'
                from user u
                left join user_rol ur on ur.user_id = u.id
                left join role r on r.id = ur.role_id
                left join career c on c.id = u.career_id
                group by u.id`,
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

exports.getFullListTeachers = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `select 
                u.id,
                u.code, 
                u.firstname, 
                u.lastname,
                CONCAT(u.code,' - ',u.firstname,' ',u.lastname) as fullInformation,
                u.active, 
                u.weighted_average,
                c.id as 'carrera.codigo de la carrera',
                c.name as 'carrera.nombre de la carrera'
                from user u
                left join user_rol ur on ur.user_id = u.id
                left join role r on r.id = ur.role_id
                left join career c on c.id = u.career_id
                where ur.role_id in (4,5)
                group by u.id`,
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

exports.Baja = function (usuario) {
    var code = usuario.params.idUser;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE user u SET u.active = 0 WHERE u.code = ?',
        }, [code], function (error, result, fields) {
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

// Para el register_permission
exports.CargaMasivaPermisos = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code && user.semester) {
            mysqlConnection.query({
                sql: 'SELECT id, code from registration_permissions where code = ?',
            }, [user.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO registration_permissions (`code`, `enabled`, `semester_id`) VALUES (?,1,?)',
                    }, [user.code, user.semester], function (error, result, fields) {
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
                message: 'Send the complete body for registration'
            })
        }
    })
}

// Para el register_permission
exports.CargaMasivaPermisosBloqueados = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code && user.semester) {
            mysqlConnection.query({
                sql: 'SELECT id, code from registration_permissions where code = ?',
            }, [user.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO registration_permissions (`code`, `enabled`, `semester_id`) VALUES (?,0,?)',
                    }, [user.code, user.semester], function (error, result, fields) {
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
                message: 'Send the complete body for registration'
            })
        }
    })
}

exports.changeName = function (data) {
    return new Promise(function (resolve, reject) {
        if (data.id) {
            mysqlConnection.query({
                sql: `Select * from user where id = ${data.id} `
            }, function (error, result, fields) {
                if (result) {
                    if (data.firstname && data.lastname) {
                        mysqlConnection.query({
                            sql: `Update user set firstname = '${data.firstname}' , lastname = '${data.lastname}' where id = ${data.id}`,
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
                    }
                    else {
                        reject({
                            codeMessage: error.code ? error.code : 'ER_',
                            message: 'Error, mandar datos completos'
                        })
                    }
                }
                else {
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: 'Id incorrecto'
                    })
                }
            })
        }
    })
}


exports.getSemesters = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `select id, name from semester`
        }, function (error, result) {
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })

            }
            else {
                const semestres = result
                resolve({ semestres })
            }
        })
    })
}