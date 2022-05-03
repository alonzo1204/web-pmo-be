const { mysqlConnection } = require('../connections/mysql');


exports.save = function (group) {
    return new Promise(function (resolve, reject) {
        if (group.student_1_id && group.student_2_id) {

            mysqlConnection.query({
                sql: 'SELECT* from db_pmo_dev_2.group where student_1_id = ? OR student_2_id = ?',
            }, [group.student_1_id, group.student_2_id], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'STUDENT DUPLICCATED',
                        message: 'One of your students is duplicated'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO db_pmo_dev_2.group (`student_1_id`,`student_2_id`, `group_weighted_average`) select u1.id , u2.id, ((u1.weighted_average)+(u2.weighted_average))/2 as group_weighted_average from user u1, user u2 where u1.id = ? and u2.id = ?',
                    }, [group.student_1_id, group.student_2_id], function (error, result, fields) {
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
                message: 'Send the complete body for project'
            })
        }
    })
}

exports.getgroup = function (code) {
    return new Promise(function (resolve, reject) {
        if (code.code) {
            const codigo = code.code;
            mysqlConnection.query({
                sql: `SELECT g.id 
                from db_pmo_dev_2.group as g 
                left join user u1 on u1.id = g.student_1_id
                left join user u2 on u2.id = g.student_2_id
                where u1.code = "${codigo}" or u2.code = "${codigo}"
                group by u2.code and u1.code`,
            }, function (error, result, fields) {
                console.log(error);
                if (result && result.length > 0) {
                    console.log(result[0].id);
                    mysqlConnection.query({
                        sql: `select g.group_weighted_average,
                         u1.firstname as 'alumno1.nombre',
                         u1.lastname as 'alumno1.apellido',
                         u1.code as 'alumno1.codigo',
                         u1.weighted_average as 'alumno1.prom',
                         u2.id as 'alumno2.id',
                         u2.firstname as 'alumno2.nombre',
                         u2.lastname as 'alumno2.apellido',
                         u2.code as 'alumno2.codigo_2',
                         u2.weighted_average as 'alumno2.prom_2'
                        from db_pmo_dev_2.group g 
                        left join user u1 on u1.id = g.student_1_id
                        left join user u2 on u2.id = g.student_2_id
                        where g.id = ${result[0].id}
                        group by u2.code and u1.code`,
                    }, function (error, result, fields) {
                        console.log(error);
                        resolve(result)
                    })
                } else {
                    reject({
                        codeMessage: 'ER_errcode',
                        message: 'No perteneces a ningun grupo'
                    })
                }
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for project'
            })
        }
    })
}