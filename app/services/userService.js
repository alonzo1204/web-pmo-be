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
                r.name as 'role.name'
                from user u, user_rol ur, role r 
                where u.id = ur.user_id and r.id = ur.role_id`,
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
                r.id as 'role.id', 
                r.name as 'role.name'
                from user u
                left join user_rol ur on ur.user_id = u.id
                left join role r on r.id = ur.role_id
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
exports.CargaMasivaPermisos = function(user){
    return new Promise(function (resolve, reject) {
        if(user.code && user.semester_id){
            mysqlConnection.query({
                sql: 'SELECT id, code from registration_permissions where code = ?',
            }, [user.code], function (error, result, fields){
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO registration_permissions (`code`, `enabled`, `semester_id`) VALUES (?,1,?)',
                    },[user.code,user.semester_id], function (error, result, fields){
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
        }else{
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}

// Para el register_permission
exports.CargaMasivaPermisosBloqueados = function(user){
    return new Promise(function (resolve, reject) {
        if(user.code && user.semester_id){
            mysqlConnection.query({
                sql: 'SELECT id, code from registration_permissions where code = ?',
            }, [user.code], function (error, result, fields){
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO registration_permissions (`code`, `enabled`, `semester_id`) VALUES (?,0,?)',
                    },[user.code,user.semester_id], function (error, result, fields){
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
        }else{
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}
