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
    const codigo = code.params.code;
    return new Promise(function (resolve, reject) {
        if (codigo) {
            mysqlConnection.query({
                sql: `SELECT g.id 
                from db_pmo_dev.group g, user u1, user u2 where g.student_1_id = u1.id and g.student_2_id = u2.id 
                and u1.code = "${codigo}" or u2.code = "${codigo}" group by u2.code and u1.code; `,
            }, function (error, result, fields) {
                if (result[0]) {
                    mysqlConnection.query({
                        sql: `select g.id as 'group_id',
                         g.group_weighted_average,

                         u1.firstname as 'alumno1.nombre',
                         u1.lastname as 'alumno1.apellido',
                         u1.code as 'alumno1.codigo',
                         u1.weighted_average as 'alumno1.prom',

                         u2.firstname as 'alumno2.nombre',
                         u2.lastname as 'alumno2.apellido',
                         u2.code as 'alumno2.codigo',
                         u2.weighted_average as 'alumno2.prom',

                         pa.id as 'project_assigned.id', 
                         pa.code as 'project_assigned.code', 
                         pa.name as 'project_assigned.name', 
                         pa.description as 'project_assigned.description', 
                         pa.general_objective as 'project_assigned.general_objective', 
                         pa.specific_objetive_1 as 'project_assigned.specific_objective_1',
                         pa.specific_objetive_2 as 'project_assigned.specific_objective_2',
                         pa.specific_objetive_3 as 'project_assigned.specific_objective_3',
                         pa.specific_objetive_4 as 'project_assigned.specific_objective_4',
                         pa.paper as 'project_assigned.paper',
                         pa.devices as 'project_assigned.devices',
                         pa.url_file as 'project_assigned.url_file',
                         pa.url_sharepoint as 'project_assigned.url_sharepoint'

                        from db_pmo_dev.group g, user u1, user u2, project pa where g.student_1_id = u1.id and g.student_2_id = u2.id 
                        and g.project_assigned = pa.id and u1.code = "${codigo}" or u2.code = "${codigo}" group by u2.code and u1.code`,
                    }, function (error, result, fields) {
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