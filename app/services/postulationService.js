const { mysqlConnection } = require('../connections/mysql');

exports.getFullList = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `select
                p.id, 
                p.accepted, 
                p.iteration, 
                p.postulation_date, 
                p.group_weighted_average,
                u1.id as 'student_1.id',
                u1.code as 'student_1.code',
                u1.firstname as 'student_1.firstname',
                u1.lastname as 'student_1.lastname',
                
                u2.id as 'student_2.id',
                u2.code as 'student_2.code',
                u2.firstname as 'student_2.firstname',
                u2.lastname as 'student_2.lastname',
                
                p1.id as 'p1.id', 
                p1.code as 'p1.code', 
                p1.name as 'p1.name', 
                p1.description as 'p1.description', 
                p1.general_objective as 'p1.general_objective', 
                p1.specific_objetive_1 as 'p1.specific_objective_1',
                p1.specific_objetive_2 as 'p1.specific_objective_2',
                p1.specific_objetive_3 as 'p1.specific_objective_3',
                p1.specific_objetive_4 as 'p1.specific_objective_4',
                p1.paper as 'p1.paper',
                p1.devices as 'p1.devices',
                p1.url_file as 'p1.url_file',
                p1.url_sharepoint as 'p1.url_sharepoint',
                
                p2.id as 'p2.id', 
                p2.code as 'p2.code', 
                p2.name as 'p2.name', 
                p2.description as 'p2.description', 
                p2.general_objective as 'p2.general_objective', 
                p2.specific_objetive_1 as 'p2.specific_objective_1',
                p2.specific_objetive_2 as 'p2.specific_objective_2',
                p2.specific_objetive_3 as 'p2.specific_objective_3',
                p2.specific_objetive_4 as 'p2.specific_objective_4',
                p2.paper as 'p2.paper',
                p2.devices as 'p2.devices',
                p2.url_file as 'p2.url_file',
                p2.url_sharepoint as 'p2.url_sharepoint',
                
                p3.id as 'proj1.id', 
                p3.code as 'proj1.code', 
                p3.name as 'proj1.name', 
                p3.description as 'proj1.description', 
                p3.general_objective as 'proj1.general_objective', 
                p3.specific_objetive_1 as 'proj1.specific_objective_1',
                p3.specific_objetive_2 as 'proj1.specific_objective_2',
                p3.specific_objetive_3 as 'proj1.specific_objective_3',
                p3.specific_objetive_4 as 'proj1.specific_objective_4',
                p3.paper as 'proj1.paper',
                p3.devices as 'proj1.devices',
                p3.url_file as 'proj1.url_file',
                p3.url_sharepoint as 'proj1.url_sharepoint',
                
                p4.id as 'p4.id', 
                p4.code as 'p4.code', 
                p4.name as 'p4.name', 
                p4.description as 'p4.description', 
                p4.general_objective as 'p4.general_objective', 
                p4.specific_objetive_1 as 'p4.specific_objective_1',
                p4.specific_objetive_2 as 'p4.specific_objective_2',
                p4.specific_objetive_3 as 'p4.specific_objective_3',
                p4.specific_objetive_4 as 'p4.specific_objective_4',
                p4.paper as 'p4.paper',
                p4.devices as 'p4.devices',
                p4.url_file as 'p4.url_file',
                p4.url_sharepoint as 'p4.url_sharepoint',
                
                pa.id as 'pa.id', 
                pa.code as 'pa.code', 
                pa.name as 'pa.name', 
                pa.description as 'pa.description', 
                pa.general_objective as 'pa.general_objective', 
                pa.specific_objetive_1 as 'pa.specific_objective_1',
                pa.specific_objetive_2 as 'pa.specific_objective_2',
                pa.specific_objetive_3 as 'pa.specific_objective_3',
                pa.specific_objetive_4 as 'pa.specific_objective_4',
                pa.paper as 'pa.paper',
                pa.devices as 'pa.devices',
                pa.url_file as 'pa.url_file',
                pa.url_sharepoint as 'pa.url_sharepoint'
                
                from postulation p, project p1, project p2, project p3, project p4, project pa, db_pmo_dev.group g, user u1, user u2
                where p.project_1_id = p1.id and p.project_2_id = p2.id and p.project_3_id = p3.id and
                 p.project_4_id = p4.id and pa.id and g.id = p.group_id and g.student_1_id = u1.id and
                 g.student_2_id = u2.id
                 group by p.id`,
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

exports.save = function (postulation) {
    return new Promise(function (resolve, reject) {
        if (postulation.group_id && postulation.project_1_id && postulation.project_2_id && postulation.project_3_id && postulation.project_4_id) {
            mysqlConnection.query({
                sql: 'SELECT id, group_id from postulation where group_id = ?',
            }, [postulation.group_id], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'STUDENT_IN_POSTULATION',
                        message: `The group with id ${postulation.group_id} are already in a postulation`
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO postulation (`group_id`, `project_1_id`, `project_2_id`, `project_3_id`, `project_4_id`) VALUES (?,?,?,?,?)',
                    }, [
                        postulation.group_id,
                        postulation.project_1_id, postulation.project_2_id,
                        postulation.project_3_id, postulation.project_4_id,], function (error, result, fields) {
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
                message: 'Send the complete body for postulation'
            })
        }
    })
}

exports.getpostulations = function (code) {
    const codigo = code.params.code;
    return new Promise(function (resolve, reject) {
        if (codigo) {
            mysqlConnection.query({
                sql: `SELECT p.id 
                from postulation p, db_pmo_dev.group g, user u1, user u2 where p.group_id = g.id and g.student_1_id = u1.id and g.student_2_id = u2.id 
                and u1.code = "${codigo}" or u2.code = "${codigo}" group by u2.code and u1.code; `,
            }, function (error, result, fields) {
                if (result[0]) {
                    mysqlConnection.query({
                        sql: `select
                        p.id, 
                        p.accepted, 
                        p.iteration, 
                        p.postulation_date, 
                        p.group_weighted_average,
                        
                        u1.id as 'student_1.id',
                        u1.code as 'student_1.code',
                        u1.firstname as 'student_1.firstname',
                        u1.lastname as 'student_1.lastname',
                        
                        u2.id as 'student_2.id',
                        u2.code as 'student_2.code',
                        u2.firstname as 'student_2.firstname',
                        u2.lastname as 'student_2.lastname',

                        p.project_1_id,
                        p.project_2_id,
                        p.project_3_id,
                        p.project_4_id
                                                
                        from postulation p, db_pmo_dev.group g, user u1, user u2 where p.group_id = g.id and g.student_1_id = u1.id and g.student_2_id = u2.id 
                        and u1.code = "${codigo}" or u2.code = "${codigo}" group by u2.code and u1.code; `,
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