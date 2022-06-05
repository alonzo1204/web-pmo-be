const { mysqlConnection, sequelize } = require('../connections');
const { postulationModel, projectModel, groupModel, histPostulationModel, userModel } = require('../models');
const { Op } = require("sequelize");


//Get full list postulations
exports.getFullListV1 = function () {
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

exports.getFullListV2 =function(){
    return new Promise(function(resolve,reject){
        postulationModel.findAll({include:{all: true, nested: true}, order:[['id','ASC']]}).then(postulation=>{
            resolve(postulation);
        }).catch(error=>{
            reject(error);
        })
    })
};


//Save postulation
exports.saveV1 = function (postulation) {
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

exports.saveV2 =  function (postulation) {
    return new Promise(function (resolve, reject) {
        if (postulation.group_id && postulation.project_1_id && postulation.project_2_id && postulation.project_3_id && postulation.project_4_id) {
            postulationModel.findOne({where:{group_id:postulation.group_id}}).then(function(result){
                if (result!=null||result!=undefined) {
                    reject({
                        codeMessage: 'STUDENT_IN_POSTULATION',
                        message: `The group with id ${postulation.group_id} are already in a postulation`
                    })
                }else{
                    postulationModel.create({
                        group_id:postulation.group_id,
                        project_1_id:postulation.project_1_id,
                        project_2_id:postulation.project_2_id,
                        project_3_id:postulation.project_3_id, 
                        project_4_id:postulation.project_4_id
                    }).then(NewPostulation=>{
                        resolve({data:NewPostulation,id:NewPostulation.id})
                    }).catch(error=>{
                        reject(error)
                    })
                }
            });
        }else{
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for postulation'
            })
        }
    })
}

//Mis postulaciones
exports.myPostulationV1 = function (user) {
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
                c1.id as 'student_1.carrera.codigo',
                c1.name as 'student_1.carrera.nombre',
                u2.id as 'student_2.id',
                u2.code as 'student_2.code',
                u2.firstname as 'student_2.firstname',
                u2.lastname as 'student_2.lastname',
                c2.id as 'student_2.carrera.codigo',
                c2.name as 'student_2.carrera.nombre',
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
                
                from postulation p
                left join project p1 on p1.id = p.project_1_id
                left join project p2 on p2.id = p.project_2_id
                left join project p3 on p2.id = p.project_3_id
                left join project p4 on p2.id = p.project_4_id
				left join project pa on pa.id = p.project_assigned
				left join db_pmo_dev.group g on g.id = p.group_id
                left join user u1 on u1.id = g.student_1_id
                left join user u2 on u2.id = g.student_2_id
                left join career c1 on c1.id = u1.career_id
                left join career c2 on c2.id = u2.career_id
                where (g.student_1_id = ${user.id} or g.student_2_id= ${user.id})
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

exports.myPostulationV2 = function (user) {
    return new Promise(async function (resolve, reject) {
        const grupo=await groupModel.findOne({
            where:{
                [Op.or]:[
                    {student_1_id: user.id},
                    {student_2_id: user.id}
                ]
            }
        })
        postulationModel.findAll({include:{all: true, nested: true}},{
            where:{
                group_id:grupo.getDataValue('id')
            }
        }).then(postulacion=>{
            resolve(postulacion)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}

//setProyects
exports.setProyectsV1 = function () {
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
                loopV1(result, 0, next, resolve)

            }
            else {
                resolve('No hay postulaciones pendientes')
            }

        })
    })
}

exports.setProyectsV2 = function () {
    var ret
    return new Promise(function (resolve, reject) {
        postulationModel.findAll({include:{all: true, nested: true}},{
            where:{
                project_assigned:null
            }
        }).then(postulations=>{
            if(postulations.length()>0){
                const next = {
                    correctas: "Postulaciones asignadas: ",
                    no_concretadas: "Postulaciones sin asignar: "
                }
                loopV2(result, 0, next, resolve)
            }else{
                resolve('No hay postulaciones pendientes')
            }
        }).catch(error=>{
            reject({
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}

async function loopV1(r, current, next, callback) {
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

async function loopV2(r, current, next, callback) {
    if (current == r.length) {
        next.correctas = next.correctas.substring(0, next.correctas.length - 2)
        next.no_concretadas = next.no_concretadas.substring(0, next.no_concretadas.length - 2)
        callback(next)
        return
    }
    var retr
    setTimeout(() => {
        const res = r[current]
        sequelize.query(`select id from project where
        group_id is null and (id = ${res.project_1_id} or id = ${res.project_2_id}
        or id = ${res.project_3_id} or id = ${res.project_4_id}) ;`).then(function(result){
            if(result.length>0){
                const proj_id = result[0].id
                sequelize.query( 
                    `update project set group_id = ${res.group_id}, project_process_state_id = 5 where id = ${proj_id}`
                ).then(function(){
                    sequelize.query(
                        `update postulation set project_assigned = ${proj_id} where id = ${res.id}`
                    ).then(function(){
                        sequelize.query(
                            `update db_pmo_dev.group set project_assigned = ${proj_id} where id = ${res.group_id}`
                        ).then(function(){
                            log = {
                                correctas: `${next.correctas}${res.id}, `,
                                no_concretadas: next.no_concretadas
                            }
                            if (current < r.length) {
    
                                retr = loop(r, current + 1, log, callback);
                            }
                        }).catch(error=>{
                            console.log(error)
                            log = {
                                correctas: next.correctas,
                                no_concretadas: `${next.no_concretadas}${res.id}, `
                            }
                            if (current < r.length) {
    
                                retr = loop(r, current + 1, log, callback);
                            }
                        }) 
                    }).catch(error=>{
                        log = {
                            correctas: next.correctas,
                            no_concretadas: `${next.no_concretadas}${res.id}, `
                        }
                        if (current < r.length) {
    
                            retr = loop(r, current + 1, log, callback);
                        }
                    })
                }).catch(error=>{
                    log = {
                        correctas: next.correctas,
                        no_concretadas: `${next.no_concretadas}${res.id}, `
                    }
                    if (current < r.length) {
    
                        retr = loop(r, current + 1, log, callback);
                    }
                })    
            }else{
                sequelize.query(
                    `update postulation set project_assigned = null where id = ${res.id}`
                ).then(function(result){
                    sequelize.query(
                        `update db_pmo_dev.group set project_assigned = null where id = ${res.group_id}`
                    ).then(function(result){
                        log = {
                            correctas: next.correctas,
                            no_concretadas: `${next.no_concretadas}${res.id}, `
                        }
                        if (current < r.length) {

                            retr = loop(r, current + 1, log, callback);
                        }
                    }).catch(error=>{
                        console.log(error)
                        log = {
                            correctas: next.correctas,
                            no_concretadas: `${next.no_concretadas}${res.id}, `
                        }
                        if (current < r.length) {

                            retr = loop(r, current + 1, log, callback);
                        }
                    })
                }).catch(error=>{
                    log = {
                        correctas: next.correctas,
                        no_concretadas: `${next.no_concretadas}${res.id}, `
                    }
                    if (current < r.length) {

                        retr = loop(r, current + 1, log, callback);
                    }
                })
            }
        }).catch(error=>{
            log = {
                correctas: next.correctas,
                no_concretadas: `${next.no_concretadas}${res.id}, `
            }
            if (current < r.length) {

                retr = loop(r, current + 1, log, callback);
            }
        })
    }, 2000);
    return retr
}

// history
exports.getHistoryV1 = function (requirements) {
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

exports.getHistoryV2 = function (requirements) {
    return new Promise(function (resolve, reject) {
        histPostulationModel.findAll({include:{all: true, nested: true}},{
            where:{
                id_postulation_row:requirements.id_postulation_row
            }
        }).then(hpo=>{
            resolve(hpo)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}

//postulation
exports.getpostulationsV1 = function (code) {
    const codigo = code.params.code;
    console.log(codigo);
    return new Promise(function (resolve, reject) {
        if (codigo) {
            mysqlConnection.query({
                sql: `SELECT 
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
                        
                from postulation p
                left join db_pmo_dev.group g on g.id = p.group_id
                left join user u1 on u1.id = g.student_1_id 
                left join user u2 on u2.id = g.student_2_id 
                where u1.code = "${codigo}" or u2.code = "${codigo}";`,
            }, function (error, result, fields) {
                if (result && result.length > 0) {
                    resolve(result)
                } else {
                    reject({
                        codeMessage: 'ER_errcode',
                        message: 'No tienes ninguna postulación pendiente'
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

exports.getpostulationsV2 = function (code) {
    const codigo = code.params.code;
    console.log(codigo);
    return new Promise(async function (resolve, reject) {
        if (codigo) {
            const users=await userModel.findOne({
                where:{
                    code:codigo
                }
            })
            const grupo=await groupModel.findOne({
                where:{
                    [Op.or]:[
                        {student_1_id:users.getDataValue('id')},
                        {student_2_id:users.getDataValue('id')}
                    ]
                }
            })
            postulationModel.findAll({include:{all: true, nested: true}},{
                where:{
                    group_id:grupo.getDataValue('id')
                }
            }).then(postulaciones=>{
                resolve(postulaciones)
            }).catch(error=>{
                reject({
                    err:error,
                    codeMessage: 'ER_errcode',
                    message: 'No tienes ninguna postulación pendiente'
                })
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for project'
            })
        }
    })
}

//asignar proyectos
exports.asignarProyectosV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `call SetProyectsV1();`
        }, function (error, result, fields) {
            if (error) {
                reject(error)
            }
            resolve(
                { msg: `Stored Procedure ejecutado correctamente` }
            )
        })
    })
}

exports.asignarProyectosV2 = function () {
    return new Promise(function (resolve, reject) {
        sequelize.query(
            `call SetProyectsV2();`
        ).then(function (result) {
            resolve(
                { msg: `Stored Procedure ejecutado correctamente` }
            )
        }).catch(error=>{
            reject(error)
        })
    })
}