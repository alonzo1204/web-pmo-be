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
                where u.id = ur.user_id and
                r.id = ur.role_id
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


