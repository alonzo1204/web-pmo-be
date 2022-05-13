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
        if (postulation.first === true) {
            if (postulation.group_id && postulation.project_1_id && postulation.project_2_id && postulation.project_3_id && postulation.project_4_id) {
                mysqlConnection.query({
                    sql: 'SELECT id, group_id from postulation where group_id = ?',
                }, [postulation.group_id], function (error, result, fields) {
                    if (result && result.length > 0) {
                        reject({
                            codeMessage: 'STUDENT_IN_POSTULATION',
                            message: `El grupo con id ${postulation.group_id} ya esta en una postulacion, o ya se postulo antes`
                        })
                    } else {
                        mysqlConnection.query({
                            sql: `
                            INSERT INTO db_pmo_dev.postulation
                            (project_1_id, project_2_id, project_3_id, project_4_id,group_weighted_average, group_id)
                            select ${postulation.project_1_id},${postulation.project_2_id},${postulation.project_3_id},${postulation.project_4_id}, g.group_weighted_average, id
                            from db_pmo_dev.group g where g.id = ${postulation.group_id}
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
        }
        else {
            if (postulation.group_id && postulation.project_1_id) {
                mysqlConnection.query({
                    sql: `SELECT id, group_id, iteration,accepted from postulation where group_id = ${postulation.group_id} order by iteration desc limit 1 `,
                }, function (error, result, fields) {
                    if (result[0].accepted == null) {
                        reject({
                            codeMessage: 'STUDENT_IN_POSTULATION',
                            message: `El grupo con id ${postulation.group_id} se encuentra en una postulacion`
                        })
                    }
                    else {
                        const project_2_id = postulation.project_2_id ? postulation.project_2_id : null
                        const project_3_id = postulation.project_3_id ? postulation.project_3_id : null
                        const project_4_id = postulation.project_4_id ? postulation.project_4_id : null
                        const iter = result[0].iteration + 1
                        if (result && result.length > 0) {
                            mysqlConnection.query({
                                sql: `
                                INSERT INTO db_pmo_dev.postulation
                                (project_1_id, project_2_id, project_3_id, project_4_id,group_weighted_average, group_id, iteration)
                                select ${postulation.project_1_id},${project_2_id},${project_3_id},${project_4_id}, g.group_weighted_average, id,${iter}
                                from db_pmo_dev.group g where g.id = ${postulation.group_id}
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
                        } else {

                            reject({
                                codeMessage: 'STUDENT_IN_POSTULATION',
                                message: `El grupo con id ${postulation.group_id} se encuentra en una postulacion`
                            })
                        }
                        if (error) {
                            reject({
                                codeMessage: error.code ? error.code : 'ER_',
                                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                            })
                        }
                    }
                })
            } else {
                reject({
                    codeMessage: 'MISSING_INFORMATION',
                    message: 'Send the complete body for postulation'
                })
            }
        }
    })
}

exports.myPostulation = function (user) {
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
                 and (g.student_1_id = ${user.id} or g.student_2_id= ${user.id})
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

exports.setProyects = function () {
    var ret
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `select po.id, po.project_1_id , po.project_2_id, po.project_3_id, po.project_4_id, po.group_id,po.group_weighted_average from postulation po, project p1,project p2,project p3, project p4, db_pmo_dev.group g
            where
            po.project_1_id = p1.id and po.project_2_id = p2.id and po.project_3_id = p3.id and po.project_4_id = p4.id and po.group_id = g.id and po.project_assigned is null 
            order by po.group_weighted_average desc;
            `
        }, function (error, result, fields) {
            if (error) {
                reject({
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
            if (result.length > 0) {
                const next = {
                    correctas: "Postulaciones asignadas: ",
                    no_concretadas: "Postulaciones sin asignar: "
                }
                loop(result, 0, next, resolve)

            }
            else {
                resolve('No hay postulaciones pendientes')
            }

        })
    })
}



async function loop(r, current, next, callback) {
    if (current == r.length) {
        next.correctas = next.correctas.substring(0, next.correctas.length - 2)
        next.no_concretadas = next.no_concretadas.substring(0, next.no_concretadas.length - 2)
        callback(next)
        return
    }
    var retr
    setTimeout(() => {
        const res = r[current]
        mysqlConnection.query({
            sql: `select id from project where
            group_id is null and (id = ${res.project_1_id} or id = ${res.project_2_id}
            or id = ${res.project_3_id} or id = ${res.project_4_id}) ;`
        }, function (error, result, fields) { //AÑADIR CONDICION DE ESTADO DE PROYECTO
            if (error) {
                log = {
                    correctas: next.correctas,
                    no_concretadas: `${next.no_concretadas}${res.id}, `
                }
                if (current < r.length) {

                    retr = loop(r, current + 1, log, callback);
                }
            }
            if (result.length > 0) {
                const proj_id = result[0].id
                mysqlConnection.query({
                    sql: `update project set group_id = ${res.group_id}, project_process_state_id = 5 where id = ${proj_id}`
                }, function (error, result, fields) {
                    if (result) {
                        mysqlConnection.query({
                            sql: `update postulation set project_assigned = ${proj_id} where id = ${res.id}`
                        }, function (error, result, fields) {
                            if (result) {
                                mysqlConnection.query({
                                    sql: `update db_pmo_dev.group set project_assigned = ${proj_id} where id = ${res.group_id}`
                                }, function (error, result, fields) {
                                    if (error) {
                                        console.log(error)
                                        log = {
                                            correctas: next.correctas,
                                            no_concretadas: `${next.no_concretadas}${res.id}, `
                                        }
                                        if (current < r.length) {

                                            retr = loop(r, current + 1, log, callback);
                                        }
                                    }
                                    if (result) {
                                        log = {
                                            correctas: `${next.correctas}${res.id}, `,
                                            no_concretadas: next.no_concretadas
                                        }
                                        if (current < r.length) {

                                            retr = loop(r, current + 1, log, callback);
                                        }
                                    }
                                })
                            }
                            if (error) {
                                log = {
                                    correctas: next.correctas,
                                    no_concretadas: `${next.no_concretadas}${res.id}, `
                                }
                                if (current < r.length) {

                                    retr = loop(r, current + 1, log, callback);
                                }
                            }
                        })
                    }

                    if (error) {
                        log = {
                            correctas: next.correctas,
                            no_concretadas: `${next.no_concretadas}${res.id}, `
                        }
                        if (current < r.length) {

                            retr = loop(r, current + 1, log, callback);
                        }

                    }
                })
            }
            else {
                mysqlConnection.query({
                    sql: `update postulation set project_assigned = null where id = ${res.id}`
                }, function (error, result, fields) {
                    if (result) {
                        mysqlConnection.query({
                            sql: `update db_pmo_dev.group set project_assigned = null where id = ${res.group_id}`
                        }, function (error, result, fields) {
                            if (error) {
                                console.log(error)
                                log = {
                                    correctas: next.correctas,
                                    no_concretadas: `${next.no_concretadas}${res.id}, `
                                }
                                if (current < r.length) {

                                    retr = loop(r, current + 1, log, callback);
                                }
                            }
                            if (result) {
                                log = {
                                    correctas: next.correctas,
                                    no_concretadas: `${next.no_concretadas}${res.id}, `
                                }
                                if (current < r.length) {

                                    retr = loop(r, current + 1, log, callback);
                                }
                            }
                        })


                    }
                    if (error) {
                        log = {
                            correctas: next.correctas,
                            no_concretadas: `${next.no_concretadas}${res.id}, `
                        }
                        if (current < r.length) {

                            retr = loop(r, current + 1, log, callback);
                        }

                    }
                })
            }
        })

    }, 2000);
    return retr
}


exports.getHistory = function (requirements) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `
                select
                hpo.id,
                hpo.accepted,
                p1.id as 'project1.id',
                p1.name as 'project1.name',
                p1.description as 'project1.description',
                p1.general_objective as 'project1.general_objective',
                p1.specific_objetive_1 as 'project1.specific_objetive_1',
                p1.specific_objetive_2 as 'project1.specific_objetive_2',
                p1.specific_objetive_3 as 'project1.specific_objetive_3',
                p1.specific_objetive_4 as 'project1.specific_objetive_4',
                p2.id as 'project2.id',
                p2.name as 'project2.name',
                p2.description as 'project2.description',
                p2.general_objective as 'project2.general_objective',
                p2.specific_objetive_1 as 'project2specific_objetive_1',
                p2.specific_objetive_2 as 'project2.specific_objetive_2',
                p2.specific_objetive_3 as 'project2.specific_objetive_3',
                p2.specific_objetive_4 as 'project2.specific_objetive_4',
                p3.id as 'project3.id',
                p3.name as 'project3.name',
                p3.description as 'project3.description',
                p3.general_objective as 'project3.general_objective',
                p3.specific_objetive_1 as 'project3.specific_objetive_1',
                p3.specific_objetive_2 as 'project3.specific_objetive_2',
                p3.specific_objetive_3 as 'project3.specific_objetive_3',
                p3.specific_objetive_4 as 'project3.specific_objetive_4',
                p4.id as 'project4.id',
                p4.name as 'project4.name',
                p4.description as 'project4.description',
                p4.general_objective as 'project4.general_objective',
                p4.specific_objetive_1 as 'project4.specific_objetive_1',
                p4.specific_objetive_2 as 'project4.specific_objetive_2',
                p4.specific_objetive_3 as 'project4.specific_objetive_3',
                p4.specific_objetive_4 as 'project4.specific_objetive_4',
                hpo.iteration,
                hpo.postulation_date,
                hpo.group_weighted_average,
                hpo.project_assigned,
                hpo.group_id,
                hpo.update_date,
                hpo.id_postulation_row
                FROM history_postulations hpo
                left join project p1 on p1.id = hpo.project_1_id 
                left join project p2 on p2.id = hpo.project_2_id 
                left join project p3 on p3.id = hpo.project_3_id 
                left join project p4 on p4.id = hpo.project_4_id
                where  hpo.id_postulation_row = ${requirements.id_postulation_row}
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

