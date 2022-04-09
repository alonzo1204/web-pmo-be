const { mysqlConnection } = require('../connections/mysql');


exports.save = function (group) {
    return new Promise(function (resolve, reject) {
        if (group.student_1_id && group.student_2_id) {

            mysqlConnection.query({
                sql: 'SELECT* from db_pmo_dev.group where student_1_id = ? OR student_2_id = ?',
            }, [group.student_1_id, group.student_2_id], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'STUDENT DUPLICCATED',
                        message: 'One of your students is duplicated'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO db_pmo_dev.group (`student_1_id`,`student_2_id`, `group_weighted_average`) select u1.id , u2.id, ((u1.weighted_average)+(u2.weighted_average))/2 as group_weighted_average from user u1, user u2 where u1.id = ? and u2.id = ?',
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
                from db_pmo_dev.group g, user u1, user u2 where g.student_1_id = u1.id and g.student_2_id = u2.id 
                and u1.code = "${codigo}" or u2.code = "${codigo}" group by u2.code and u1.code; `,
            }, function (error, result, fields) {
                if (result[0]) {
                    mysqlConnection.query({
                        sql: `select g.group_weighted_average, u1.firstname as nombre_1, u1.lastname as apellido_1, u1.code as codigo_1, u1.weighted_average as prom_1,
                        u2.firstname as nombre_2, u2.lastname as apellido_2, u2.code as codigo_2, u2.weighted_average as prom_2
                        from db_pmo_dev.group g, user u1, user u2 where g.student_1_id = u1.id and g.student_2_id = u2.id 
                        and u1.code = "${codigo}" or u2.code = "${codigo}" group by u2.code and u1.code`,
                    }, function (error, result, fields) {
                        resolve(result)
                    })
                } else {
                    reject({
                        codeMessage: 'ER_errcode',
                        message: 'codigo erroneo'
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