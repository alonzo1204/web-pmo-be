const { mysqlConnection } = require('../connections/mysql');
const { registrationPermissionsModel } = require('../models');

exports.getFullListV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `
            Select 
            rp.id as 'registration_permissions.id',
            rp.code as 'registration_permissions.code',
            (select if(rp.enabled =1,'Habilitado', 'No Habilitado' )) as 'registration_permissions.enabled', 
            s.id as 'registration_permissions.semester.id', 
            s.name as 'registration_permissions.semester.name',
            s.date_from as 'registration_permissions.semester.date_from',
            s.date_until as 'registration_permissions.semester.date_until'
            from registration_permissions rp
            left join semester s on s.id = rp.semester_id
            `,
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

exports.getFullListV2 = function () {
    return new Promise(function (resolve, reject) {
        registrationPermissionsModel.findAll({include:{all: true, nested: true}})
        .then(permissions=>{
            resolve(permissions)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}