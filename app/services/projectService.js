
const { setQuery, security, setHandleQuery, validProject } = require('../constants');

const jwt = require('jsonwebtoken');
const { projectModel, careerModel, portfolioModel, companyModel, editRequestModel, histProjectsModel, semesterModel } = require('../models/index');
const { sequelize, mysqlConnection } = require('../connections');
const { Op } = require("sequelize");

//get full list projects
exports.getFullListV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `select
                p.id, 
                p.code, 
                p.name, 
                p.description, 
                p.general_objective, 
                p.specific_objetive_1 as specific_objective_1,
                p.specific_objetive_2 as specific_objective_2,
                p.specific_objetive_3 as specific_objective_3,
                p.specific_objetive_4 as specific_objective_4,
                p.paper,
                p.devices,
                p.url_file,
                p.url_sharepoint,
                
                ca.id as 'career.id',
                ca.name as 'career.name',
                
                state.id as 'project_process_state.id',
                state.name as 'project_process_state.name',
                
                u1.id as 'student_1.id',
                u1.code as 'student_1.code',
                u1.firstname as 'student_1.firstname',
                u1.lastname as 'student_1.lastname',
                
                u2.id as 'student_2.id',
                u2.code as 'student_2.code',
                u2.firstname as 'student_2.firstname',
                u2.lastname as 'student_2.lastname',
                
                powner.id as 'product_owner.id',
                powner.code as 'product_owner.code',
                powner.firstname as 'product_owner.firstname',
                powner.lastname as 'product_owner.lastname',
                
                pmanager.id as 'portfolio_manager.id',
                pmanager.code as 'portfolio_manager.code',
                pmanager.firstname as 'portfolio_manager.firstname',
                pmanager.lastname as 'portfolio_manager.lastname',
                
                coautor.id as 'co_autor.id',
                coautor.code as 'co_autor.code',
                coautor.firstname as 'co_autor.firstname',
                coautor.lastname as 'co_autor.lastname',
                
                comp.id as 'company.id',
                comp.name as 'company.name',
                comp.image as 'company.image'
                from project p, career ca, project_process_state state, db_pmo_dev.group g, user u1, user u2, user pmanager, user coautor, user powner, company comp
                where
                p.career_id = ca.id and 
                state.id = p.project_process_state_id and 
                u1.id = g.student_1_id and 
                u2.id = student_2_id and 
                g.id = p.group_id and 
                powner.id = p.product_owner_id and 
                pmanager.id = p.portfolio_manager_id and 
                coautor.id = p.co_autor_id and 
                comp.id = p.company_id
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
        projectModel.findAll({include:{all: true, nested: true}}).then(careers=>{
            resolve(careers);
        }).catch(error=>{
            reject(error);
        })
    })
};

//Save projects
exports.saveV1 = function (project) {
    return new Promise(function (resolve, reject) {
        if (project.code && project.name && project.description && project.general_objective && project.paper && project.devices && project.career_id && project.project_process_state_id && project.company) {

            mysqlConnection.query({
                sql: 'SELECT id, code from project where code = ?',
            }, [project.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for project'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO project (`code`, `name`, `description`, `general_objective`, `specific_objetive_1`, `specific_objetive_2`, `specific_objetive_3`, `specific_objetive_4`, `paper`, `devices`, `url_file`, `url_sharepoint`, `career_id`, `group_id`, `portfolio_manager_id`, `co_autor_id`, `project_process_state_id`, `company_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    }, [
                        project.code, project.name,
                        project.description, project.general_objective,
                        project.specific_objetive_1, project.specific_objetive_2,
                        project.specific_objetive_3, project.specific_objetive_4,
                        project.paper, project.devices,
                        project.url_file, project.url_sharepoint,
                        project.career_id,
                        project.group_id,
                        project.portfolio_manager_id,
                        project.co_autor_id, project.project_process_state_id, project.company
                    ], function (error, result, fields) {
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

exports.saveV2 = function (project){
    return new Promise(function (resolve, reject) {
        if (project.code && project.name && project.paper && project.devices && project.career_id && project.semester_id && project.company_id) {
            projectModel.findOne({where:{code:project.code}}).then(function(result){
                if (result!=null||result!=undefined) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for project'
                    })
                }else{
                    projectModel.create(project).then(NewProject=>{
                        resolve({data:NewProject,id:NewProject.id})
                    }).catch(error=>{
                        reject(error)
                    })
                }
            })
        }else{
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for project'
            })
        }
    })
}

//Save excel
exports.saveExcelV1 = function (project) {
    return new Promise(function (resolve, reject) {
        if ((project.code && project.name && project.paper && project.devices && project.career_id && project.company_id) >= 0) {

            mysqlConnection.query({
                sql: 'SELECT id, code from project where code = ?',
            }, [project.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for project'
                    })
                } else {
                    mysqlConnection.query({
                        sql: "SELECT c.id as career_id, co.id as company_id, po.id as portfolio_id,po.semester_id FROM career c, company co, portfolio po  WHERE c.name = ? and co.name = ? and po.name= ?",
                    }, [project.career_id,project.company_id,project.portfolio_id], function (error, result, fields) {
                        if (result) {                            
                            mysqlConnection.query({
                                sql: 'INSERT INTO project (`code`, `name`, `description`, `general_objective`, `specific_objetive_1`, `specific_objetive_2`, `specific_objetive_3`, `specific_objetive_4`, `paper`, `devices`, `url_file`, `url_sharepoint`, `career_id`, `semester_id`, `group_id`, `portfolio_id`, `product_owner_id`, `portfolio_manager_id`, `co_autor_id`, `project_process_state_id`, `company_id`, `comments`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                            }, [
                                project.code, project.name,
                                project.description, project.general_objective,
                                project.specific_objetive_1, project.specific_objetive_2,
                                project.specific_objetive_3, project.specific_objetive_4,
                                project.paper, project.devices,
                                project.url_file, project.url_sharepoint,
                                result[0].career_id, result[0].semester_id,
                                project.group_id, result[0].portfolio_id,
                                project.product_owner_id, project.portfolio_manager_id,
                                project.co_autor_id, project.project_process_state_id, result[0].company_id, project.comments], function (error, result, fields) {
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

exports.saveExcelV2 = async function (project){
    return new Promise(async function (resolve, reject) {
        var carrera= await careerModel.findOne({where:{name:project.career_id}}).then(function(result){
            return result
        }).catch(error=>{
            reject(error)
        })
        project.career_id=carrera.id
        if(typeof(project.portfolio_id) != 'number'){
            var portfolio= await portfolioModel.findOne({where:{name:project.portfolio_id}}).then(function(result){
                return result
            }).catch(error=>{
                reject(error)
            })
            console.log(portfolio)
            project.portfolio_id=portfolio.id
        }       
        var compania= await companyModel.findOne({where:{name:project.company_id}}).then(function(result){
            return result
        }).catch(error=>{
            reject(error)
        })
        project.company_id=compania.id
        console.log(project)
        projectModel.create(project).then(NewProject=>{
            resolve(NewProject)
        }).catch(error=>{
            reject(error)
        })
    })
}

//obtener proyectos por estatus
exports.getProyectByStatusV1 = function (idProjectProcess) {
    var project_process_state_id = idProjectProcess.params.idState;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT * FROM project p WHERE p.project_process_state_id = ?',
        }, [project_process_state_id], function (error, result, fields) {
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

exports.getProyectByStatusV2 = function (idProjectProcess) {
    var stateId = idProjectProcess.params.idState;
    return new Promise(function (resolve, reject) {
        projectModel.findAll({where:{project_process_state_id:stateId}}).then(projects=>{
            resolve(projects)
        }).catch(error=>{
            reject(error)
        })
    })
}

//Rechazar projects
exports.RechazarV1 = function (project) {
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = 3 WHERE p.code = ?',
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

exports.RechazarV2 = function (project) {
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        projectModel.update({project_process_state_id:3},{where:{code:code}}).then(function(){
            projectModel.findOne({where:{code:code}}).then(project=>{
                resolve(project)
            })
        }).catch(error=>{
            reject(error)
        })
    })
}

//Aprobar projects
exports.AprobarV1 = function (project) {
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = 2 WHERE p.code = ?',
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

exports.AprobarV2 = function (project) {
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        projectModel.update({project_process_state_id:2},{where:{code:code}}).then(function(){
            projectModel.findOne({where:{code:code}}).then(project=>{
                resolve(project)
            })
        }).catch(error=>{
            reject(error)
        })
    })
}

//Aprobar con comentarios
exports.AprobarComentariosV1 = function (project, comentarios) {
    console.log(comentarios)
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = 4, p.comments = ? WHERE p.code = ?',
        }, [comentarios.comentarios, code], function (error, result, fields) {
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

exports.AprobarComentariosV2 = function (project, comentarios) {
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        projectModel.update({project_process_state_id:4
            ,comments:comentarios.comentarios},{where:{code:code}}).then(function(){
            projectModel.findOne({where:{code:code}}).then(project=>{
                resolve(project)
            })
        }).catch(error=>{
            reject(error)
        })
    })
}

//Guardar archivo en project existente
exports.saveArchivoV1 = function (project, path) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.url_file = ?, p.url_sharepoint=? WHERE p.code = ?',
        }, [project.file.filename, path, project.params.idProject], function (error, result, fields) {
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

exports.saveArchivoV2 = function (project, path) {
    return new Promise(function (resolve, reject) {
        projectModel.update({url_file:path},{where:{code:project.params.idProject}}).then(function(){
            projectModel.findOne({where:{code:project.params.idProject}}).then(project=>{
                resolve(project)
            })
        }).catch(error=>{
            reject(error)
        })
    })
}


//Actualizar estado
exports.updateStateV1 = function (ids) {
    var code = ids.params.idProject;
    var project_process_state_id = ids.params.idState;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = ? WHERE p.code = ?',
        }, [project_process_state_id, code], function (error, result, fields) {
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

exports.updateStateV2 = function (ids) {
    var code = ids.params.idProject;
    return new Promise(function (resolve, reject) {
        projectModel.update({project_process_state_id:ids.params.idState},{where:{code:code}}).then(function(){
            projectModel.findOne({where:{code:code}}).then(project=>{
                resolve(project)
            })
        }).catch(error=>{
            reject(error)
        })
    })
}


//Actualizar project
exports.updateProjectV1 = function (project) {
    return new Promise(function (resolve, reject) {
        if (project.codes && project.column && project.value) {
            const codigos = project.codes
            const res = codigos.map((cod) => {
                const prom = new Promise(function (resolve, reject) {
                    mysqlConnection.query({
                        sql: `SELECT id, code from project where code = '${cod}'`,
                    }, function (error, result, fields) {
                        if (result && result.length == 0) {
                            resolve({
                                codigo: cod,
                                error: `El codigo ${cod} no existe en la base de datos`
                            })
                        } else {
                            const sqlquery = setQuery(project.column, cod, project.value)
                            mysqlConnection.query({
                                sql: sqlquery
                            }, function (error, result, fields) {
                                if (error) {
                                    if (error.sqlMessage == "Query was empty")
                                        resolve({
                                            codigo: cod,
                                            error: `El valor ${project.value} no coincide con la columna ${project.column}`
                                        })
                                }
                                else {
                                    resolve({
                                        codigo: cod,
                                        message: `El projecto con el codigo ${cod} se alteroen la columna ${project.column} con el valor ${project.value}`
                                    })
                                }
                            })
                        }
                    })
                })
                return prom
            })
            const Mess = Promise.all(res);
            resolve(Mess)
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for project'
            })
        }
    })
}

exports.updateProjectV2 = function (project) {
    return new Promise(function (resolve, reject) {
        projectModel.update(project,{where:{code:code}}).then(function(){
            projectModel.findOne({where:{code:code}}).then(project=>{
                resolve(project)
            })
        }).catch(error=>{
            reject(error)
        })
    })
}


//pedido de actualizacion
exports.sendUpdateRequestV1 = function (project, token_inf) {
    return new Promise(function (resolve, reject) {
        if (project.project_id && project.value && project.column) {
            const uid = token_inf.token.information.id
            mysqlConnection.query({
                sql: `select p.code from db_pmo_dev.group g, project p where p.group_id = g.id and p.id = ${project.project_id} and (g.student_1_id = ${uid} or g.student_2_id = ${uid}) group by p.id`,
            }, function (error, result, fields) {
                if (result && result.length == 0 || error) {
                    resolve({
                        error: `El projecto no concuerda con el codigo de usuario`
                    })
                } else {
                    const code = result[0].code
                    const verificar = setQuery(project.column, code, project.value)
                    if (verificar == '') {
                        resolve({
                            error: `El valor ${project.value} no coincide con la columna ${project.column}`
                        })
                    }
                    else {
                        mysqlConnection.query({
                            sql: `Insert into edit_request 
                            (user_id,project_id,attribute_to_change, edit_request.value, accepted, request_date) 
                            values 
                            (${uid},${project.project_id},"${project.column}", "${project.value}", 0, CURRENT_TIMESTAMP)
                            `
                        }, function (error, result, fields) {
                            if (error) {
                                if (error.sqlMessage == "Query was empty")
                                    resolve({
                                        error: `El valor ${project.value} no coincide con la columna ${project.column}`
                                    })
                                else (resolve(error))
                            }
                            else {
                                resolve({
                                    message: `Se solicito el cambio del proyecto ${code} la columna ${project.column} con el valor: ${project.value}`
                                })
                            }
                        })
                    }
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

exports.sendUpdateRequestV2 = function (project, token_inf) {
    return new Promise(function (resolve, reject) {
        if (project.project_id && project.value && project.column) {
            const uid = token_inf.token.information.id
            projectModel.findOne({where:{code:code}}).then(Project=>{
                const code = Project.getDataValue('code')
                const verificar = setQuery(project.column, code, project.value)
                    if (verificar == '') {
                        resolve({
                            error: `El valor ${project.value} no coincide con la columna ${project.column}`
                        })
                    }
                    else {
                        editRequestModel.create({user_id:uid,project_id:project.project_id,
                            attribute_to_change:project.column, value:project.value, 
                            accepted:0}).then(editrequest=>{
                                resolve({
                                    message: `Se solicito el cambio del proyecto ${code} la columna ${project.column} con el valor: ${project.value}`,
                                    data:editrequest
                                })
                            }).catch(error=>{
                                if (error.sqlMessage == "Query was empty")
                                    reject({
                                        error: `El valor ${project.value} no coincide con la columna ${project.column}`
                                    })
                                else (reject(error))
                            })
                        }
                }).then(error=>{
                    reject({
                        er:error,
                        error: `El projecto no concuerda con el codigo de usuario`
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


//Handle Update
exports.handleUpdateV1 = function (req) {
    return new Promise(function (resolve, reject) {
        if (req.id) {
            mysqlConnection.query({
                sql: `
                    select* from edit_request where id = ${req.id} and accepted = 0
                    `,
            }, function (error, result, fields) {
                if (result && result.length == 1) {
                    const column = result[0].attribute_to_change
                    const code = result[0].project_id
                    const value = result[0].value
                    if (req.state == "Aprobado") {
                        let query = setHandleQuery(column, code, value)
                        if (query == '') {
                            query = setHandleQuery(column, code, parseInt(value))
                        }
                        mysqlConnection.query({
                            sql: query
                        }, function (error, result, fields) {
                            if (error) {
                                if (error.sqlMessage == "Query was empty")
                                    resolve({
                                        error: `El valor ${value} no coincide con la columna ${column}`
                                    })
                            }
                            else {
                                mysqlConnection.query({
                                    sql: `update edit_request set accepted = 1 where id = ${req.id}`
                                }, function (error, result, fields) {
                                    if (error) {
                                        if (error.sqlMessage == "Query was empty")
                                            resolve({
                                                error: `El valor ${value} no coincide con la columna ${column}`
                                            })
                                    }
                                    else {
                                        resolve({
                                            message: `El projecto con el codigo ${req.id} se alteroen la columna ${column} con el valor ${value}`
                                        })
                                    }
                                })

                            }
                        })
                    }
                    if (req.state == "Desaprobado") {
                        mysqlConnection.query({
                            sql: `update edit_request set accepted = 2 where id = ${req.id}`
                        }, function (error, result, fields) {
                            if (result) {
                                resolve({
                                    message: `Se rechazo la solicitud de cambio del proyecto con codigo ${req.id} de manera correcta`
                                })
                            }
                            else {
                                resolve({
                                    message: `Se rechazo la solicitud de cambio del proyecto con codigo ${req.id} de manera correcta`
                                })
                            }
                        })
                    }
                } else {
                    resolve({
                        error: `El projecto con id ${req.id} ya fue atendido`
                    })
                }
            })
        } else {
            resolve({
                error: 'Send the complete body for project'
            })
        }
    })
}

exports.handleUpdateV2 = function (req) {
    return new Promise(function (resolve, reject) {
        if (req.id) {
            editRequestModel.findOne({where:{id:req.id,accepted:0}}).then(edit=>{
                const column = edit.getDataValue('attribute_to_change')
                const code = edit.getDataValue('project_id')
                const value = edit.getDataValue('value')
                if (req.state == "Aprobado") {
                    let query = setHandleQuery(column, code, value)
                    if (query == '') {
                        query = setHandleQuery(column, code, parseInt(value))
                    }
                    sequelize.query(query).then(result=>{
                        editRequestModel.update({accepted:1},{where:{id:req.id}}).then(updated=>{
                            resolve({
                                result,
                                updated,
                                message: `El projecto con el codigo ${req.id} se altero en la columna ${column} con el valor ${value}`
                            })
                        }).catch(error=>{
                            reject({error})
                        })
                    }).catch(error=>{
                        reject({
                            er:error,
                            error: `El valor ${value} no coincide con la columna ${column}`
                        })
                    })
                }
                else if (req.state == "Desaprobado") {
                    editRequestModel.update({accepted:2},{where:{id:req.id}}).then(updated=>{
                        resolve({
                            message: `Se rechazo la solicitud de cambio del proyecto con codigo ${req.id} de manera correcta`
                        })
                    }).catch(error=>{
                        reject({error})
                    })
                }
            }).catch(error=>{
                reject({
                    error: `El projecto con id ${req.id} ya fue atendido`
                })
            })
        } else {
            reject({
                error: 'Send the complete body for project'
            })
        }
    })
}


//Actualizaciones multiples
exports.mutipleUpdatesV1 = (arr) => {
    const data = arr.projects
    return new Promise(function (resolve, reject) {
        const projects = data.map((project) => {
            if (project.code) {
                const prom = new Promise(function (resolve, reject) {
                    mysqlConnection.query({
                        sql: `SELECT id, code from project where code = '${project.code}'`,
                    }, function (error, result, fields) {
                        if (result && result.length == 0) {
                            resolve({
                                codigo: project.code,
                                error: `El codigo ${project.code} no existe en la base de datos`
                            })
                        } else {
                            if (project.name && project.description && project.general_objective &&
                                project.specific_objetive_1 && project.specific_objetive_2 &&
                                project.specific_objetive_3 && project.specific_objetive_4 &&
                                project.url_file && project.url_sharepoint && project.comments &&
                                project.paper && project.devices && project.career_id &&
                                project.product_owner_id && project.portfolio_manager_id &&
                                project.co_autor_id && project.project_process_state_id &&
                                project.company_id && project.portfolio_id &&
                                project.semester_id && project.group_id) {
                                const validacion = validProject(project);
                                if (validacion) {
                                    mysqlConnection.query({
                                        sql: `update project set 
                                        name = "${project.name}", description= "${project.description}", general_objective= "${project.general_objective}", specific_objetive_1= "${project.specific_objetive_1}", specific_objetive_2= "${project.specific_objetive_2}", specific_objetive_3= "${project.specific_objetive_3}", specific_objetive_4= "${project.specific_objetive_4}",
                                        paper= ${project.paper}, devices= ${project.devices}, url_file= "${project.url_file}", url_sharepoint= "${project.url_sharepoint}" , career_id= ${project.career_id}, product_owner_id= ${project.product_owner_id}, portfolio_manager_id=${project.portfolio_manager_id}, co_autor_id= ${project.co_autor_id}, project_process_state_id=${project.project_process_state_id},
                                        company_id= ${project.company_id}, group_id= ${project.group_id}, portfolio_id= ${project.portfolio_id}, semester_id= ${project.semester_id}, comments = "${project.comments}" where code = "${project.code}"`
                                    }, function (error, result, fields) {
                                        if (error) {
                                            resolve({
                                                codigo: project.code,
                                                error: error
                                            })
                                        }
                                        else {
                                            resolve({
                                                codigo: project.code,
                                                message: `El projecto con el codigo ${project.code} se cambio correctamente`
                                            })
                                        }
                                    })
                                }
                                else {
                                    resolve({
                                        codigo: project.code,
                                        error: `El projecto con el codigo ${project.code} tiene un valor incorrecto.`
                                    })
                                }

                            }

                            else {
                                return resolve({
                                    codigo: project.code,
                                    error: `El proyecto con codigo ${project.code} no se envio con los datos completos`
                                })
                            }
                        }
                    })
                })
                return prom
            }
            else {
                return resolve({
                    codigo: 'ERR_CODE',
                    error: `El proyecto se envio sin codigo`
                })
            }

        })
        const resps = Promise.all(projects);
        resolve(resps)
    })
}

exports.mutipleUpdatesV2 = (arr) => {
    const data = arr.projects
    return new Promise(function (resolve, reject) {
        const projects = data.map((project) => {
            if (project.code) {
                const prom = new Promise(function (resolve, reject) {
                    projectModel.findOne({
                        attributes: ['id', 'code'],
                        where:{code:project.code}
                    }).then(result=>{
                        if (project.name && project.description && project.general_objective &&
                            project.specific_objetive_1 && project.specific_objetive_2 &&
                            project.specific_objetive_3 && project.specific_objetive_4 &&
                            project.url_file && project.url_sharepoint && project.comments &&
                            project.paper && project.devices && project.career_id &&
                            project.product_owner_id && project.portfolio_manager_id &&
                            project.co_autor_id && project.project_process_state_id &&
                            project.company_id && project.portfolio_id &&
                            project.semester_id && project.group_id) {
                            const validacion = validProject(project);
                            if (validacion) {
                                projectModel.update(project,{where:{code:project.code}}).then(updated=>{
                                    resolve({
                                        codigo: project.code,
                                        message: `El projecto con el codigo ${project.code} se cambio correctamente`
                                    })
                                }).catch(error=>{
                                    reject({
                                        codigo: project.code,
                                        error: error
                                    })
                                })
                            }
                            else {
                                reject({
                                    codigo: project.code,
                                    error: `El projecto con el codigo ${project.code} tiene un valor incorrecto.`
                                })
                            }

                        }
                        else {
                            return reject({
                                codigo: project.code,
                                error: `El proyecto con codigo ${project.code} no se envio con los datos completos`
                            })
                        }
                    }).catch(error=>{
                        reject({
                            err:error,
                            codigo: project.code,
                            error: `El codigo ${project.code} no existe en la base de datos`
                        })
                    })
                })
                return prom
            }
            else {
                return resolve({
                    codigo: 'ERR_CODE',
                    error: `El proyecto se envio sin codigo`
                })
            }
        })
        const resps = Promise.all(projects);
        resolve(resps)
    })
}

//obtener projectos segun varios estatus
exports.getProyectByStatusVariousV1 = function (idProjectProcess) {
    var state_ids = idProjectProcess.params.idState;
    var career_ids = idProjectProcess.params.idCareer;

    return new Promise(function (resolve, reject) {
        if (state_ids && career_ids) {
            mysqlConnection.query({
                sql: `SELECT 
                p.id, 
                p.code, 
                p.name, 
                p.description, 
                p.general_objective, 
                p.specific_objetive_1 as specific_objective_1,
                p.specific_objetive_2 as specific_objective_2,
                p.specific_objetive_3 as specific_objective_3,
                p.specific_objetive_4 as specific_objective_4,
                p.paper,
                p.devices,
                p.url_file,
                p.url_sharepoint,
                
                ca.id as 'career.id',
                ca.name as 'career.name',
                
                state.id as 'project_process_state.id',
                state.name as 'project_process_state.name',
                
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
                powner.id as 'product_owner.id',
                powner.code as 'product_owner.code',
                powner.firstname as 'product_owner.firstname',
                powner.lastname as 'product_owner.lastname',
                
                pmanager.id as 'portfolio_manager.id',
                pmanager.code as 'portfolio_manager.code',
                pmanager.firstname as 'portfolio_manager.firstname',
                pmanager.lastname as 'portfolio_manager.lastname',
                
                coautor.id as 'co_autor.id',
                coautor.code as 'co_autor.code',
                coautor.firstname as 'co_autor.firstname',
                coautor.lastname as 'co_autor.lastname',
                
                comp.id as 'company.id',
                comp.name as 'company.name',
                comp.image as 'company.image'
                        FROM project p
                left join career ca on ca.id = p.career_id
                left join  project_process_state state on state.id = p.project_process_state_id
                left join db_pmo_dev.group g on g.id = p.group_id
                left join user u1 on u1.id = g.student_1_id
                left join user u2 on u2.id = g.student_2_id
                left join career c1 on c1.id = u1.career_id
                left join career c2 on c2.id = u2.career_id
                left join user pmanager on pmanager.id = p.portfolio_manager_id
                left join user coautor on coautor.id = p.co_autor_id
                left join user powner on powner.id = p.product_owner_id
                left join company comp on comp.id = p.company_id
                where p.project_process_state_id in (${state_ids})
                and p.career_id in (${career_ids})
                group by p.id `,
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
                message: "No se ingresaron los valores completos"
            })
        }

    })
}

exports.getProyectByStatusVariousV2 = function (idProjectProcess) {
    var state_ids = idProjectProcess.params.idState;
    return new Promise(function (resolve, reject) {
        projectModel.findAll({
            include:{all: true, nested: true},
            where:{
                project_process_state_id:{
                    [Op.or]:[state_ids]
            }
        }
        }).then(projects=>{
            resolve(projects)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}



//Mi solicitud de Cambio
exports.getMyEditRequestV1 = function (idUser) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT er.id,
            er.attribute_to_change,
            er.value, 
            er.accepted, 
            er.request_date,

            u.id as 'user.id',
            u.firstname as 'user.firstname',
            u.lastname as 'user.lastname',

            p.id as 'project.id', 
            p.code as 'project.code', 
            p.name as 'project.name', 
            p.description as 'project.description' 

            FROM edit_request er, user u, project p
            WHERE er.user_id = ? and
            u.id=er.user_id and
            p.id=er.project_id`,
        },[idUser], function (error, result, fields) {
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

exports.getMyEditRequestV2 = function (idUser) {
    return new Promise(function (resolve, reject) {
        editRequestModel.findAll({
            include:{all: true, nested: true},
            where:{user_id:idUser}
        }).then(requests=>{
            resolve(requests)
        }).catch(error=>{
            reject(error)
        })
    })
}


//Solicitudes de cambios
exports.getEditRequestV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT er.id,
             er.attribute_to_change,
             er.value, 
             er.accepted, 
             er.request_date,

             u.id as 'user.id',
             u.firstname as 'user.firstname',
             u.lastname as 'user.lastname',

             p.id as 'project.id', 
             p.code as 'project.code', 
             p.name as 'project.name', 
             p.description as 'project.description' 

             FROM edit_request er, user u, project p`,
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

exports.getEditRequestV2 = function () {
    return new Promise(function (resolve, reject) {
        editRequestModel.findAll({include:{all: true, nested: true}}).then(requests=>{
            resolve(requests)
        }).catch(error=>{
            reject(error)
        })
    })
}

//Guardar nuevo project con archivo
exports.saveWithArchiveV1 = function (project,path) {
    return new Promise(function (resolve, reject) {
        if (project.code && project.name && project.description && project.general_objective && project.paper && project.devices && project.career_id && project.project_process_state_id && project.company_id) {

            mysqlConnection.query({
                sql: 'SELECT id, code from project where code = ?',
            }, [project.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for project'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO project (`code`, `name`, `description`, `general_objective`, `specific_objetive_1`, `specific_objetive_2`, `specific_objetive_3`, `specific_objetive_4`, `paper`, `devices`, `url_file`, `url_sharepoint`, `career_id`, `group_id`, `portfolio_manager_id`, `co_autor_id`, `project_process_state_id`, `company_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    }, [
                        project.code, project.name,
                        project.description, project.general_objective,
                        project.specific_objetive_1, project.specific_objetive_2,
                        project.specific_objetive_3, project.specific_objetive_4,
                        project.paper, project.devices,
                        path, project.url_sharepoint,
                        project.career_id,
                        project.group_id,
                        project.portfolio_manager_id,
                        project.co_autor_id, project.project_process_state_id, project.company_id
                    ], function (error, result, fields) {
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

exports.saveWithArchiveV2 = function (project,path) {
    return new Promise(async function (resolve, reject) {
        if (project.code && project.name && project.description && project.general_objective && project.paper && project.devices && project.career_id && project.project_process_state_id && project.company_id) {
            const proyecto =await projectModel.findOne({
                attributes: ['id', 'code'],
                where:{code:project.code}
            })
            if(proyecto==null || proyecto==undefined){
                project.url_file=path
                projectModel.create(project).then(Newproject=>{
                    resolve(Newproject)
                }).catch(error=>{
                    reject(error)
                })
            }else{
                reject({
                    codeMessage: 'CODE_DUPLICATED',
                    message: 'Send an unique code for project'
                })
            }
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for project'
            })
        }
    })
}


//history
exports.getHistoryV1 = function (requirements) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `
                SELECT 
                p.id,
                p.code,
                p.name,
                p.description,
                p.general_objective,
                p.specific_objetive_1,
                p.specific_objetive_2,
                p.specific_objetive_3,
                p.specific_objetive_4,
                g.id as 'g.id',
                g.group_weighted_average as 'g.group_weighted_average',
                g.student_1_id as 'g.student_1_id',
                g.student_2_id as 'g.student_2_id',
                g.project_assigned as '',
                p.paper,
                p.devices,
                p.url_file,
                p.url_sharepoint,
                p.career_id,
                p.product_owner_id,
                p.portfolio_manager_id,
                p.co_autor_id,
                p.project_process_state_id,
                p.company_id,
                p.group_id,
                p.portfolio_id,
                p.semester_id,
                p.comments,
                p.update_date,
                p.id_project_row
                FROM history_projects p 
                left join db_pmo_dev.group g on p.group_id = g.id
                where p.id_project_row = ${requirements.id_postulation_row}
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
        histProjectsModel.findAll({include:{all: true, nested: true}},{
            where:{
                id_project_row:requirements.id_postulation_row
            }
        }).then(history=>{
            resolve(history)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}

//Guardar profesores
exports.saveTeachersV1 = function (body) {
    return new Promise(function (resolve, reject) {
        if (!body.code || !body.product_owner_id || !body.portfolio_manager_id || !body.co_autor_id) {
            reject({
                message: 'No se ha enviado la información completa'
            })
        } else {
            var code = body.code;
            var product_owner_id = body.product_owner_id;
            var portfolio_manager_id = body.portfolio_manager_id;
            var co_autor_id = body.co_autor_id;
            mysqlConnection.query({
                sql: 'UPDATE project p SET p.project_process_state_id = 6, p.product_owner_id = ?, p.portfolio_manager_id = ?, p.co_autor_id = ?, update_date = CURRENT_TIMESTAMP WHERE p.code = ?',
            }, [product_owner_id, portfolio_manager_id, co_autor_id, code], function (error, result, fields) {
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

    })
}

exports.saveTeachersV2 = function (body) {
    return new Promise(function (resolve, reject) {
        if (!body.code || !body.product_owner_id || !body.portfolio_manager_id || !body.co_autor_id) {
            reject({
                message: 'No se ha enviado la información completa'
            })
        } else {
            var code = body.code;
            var product_owner_id = body.product_owner_id;
            var portfolio_manager_id = body.portfolio_manager_id;
            var co_autor_id = body.co_autor_id;
            projectModel.update({
                project_process_state_id:6,
                product_owner_id:product_owner_id,
                portfolio_manager_id:portfolio_manager_id,
                co_autor_id:co_autor_id,
                update_date:CURRENT_TIMESTAMP,
            },{
                where:{
                    code:code
                }
            }).then(function(){
                projectModel.findOne({include:{all: true, nested: true}},{
                    where:{
                        code:code
                    }
                }).then(projectUpdated=>{
                    resolve(projectUpdated)
                })
            }).catch(error=>{
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            })
        }
    })
}

exports.downloadProjects = function (arr) {
    const data = [];
    const projects = arr.data;
    return new Promise(function (resolve, reject) {
        if (projects) {
            for (var i = 0; i < projects.length; i++) {
                const projecto = {
                    "Codigo": projects[i].code,
                    "Nombre": projects[i].name,
                    "Descripcion": projects[i].description,
                    "Objetivo General": projects[i].general_objective,
                    "Objetivo Especifico 1": projects[i].specific_objective_1,
                    "Objetivo Especifico 2": projects[i].specific_objective_2,
                    "Objetivo Especifico 3": projects[i].specific_objective_3,
                    "Objetivo Especifico 4": projects[i].specific_objective_4,
                    "Paper": projects[i].paper == 1 ? "SI" : "NO",
                    "Dispositivos": projects[i].devices == 1 ? "SI" : "NO",
                    "Url del archivo": projects[i].url_file,
                    "Url del sharepoint": projects[i].url_sharepoint,
                    "Nombre de la carrera": projects[i].career.name,
                    "Estado del projecto": projects[i].project_process_state.name,
                    "Codigo del alumno 1": projects[i].student_1.code,
                    "Nombre del alumno 1": projects[i].student_1.firstname,
                    "Apellido del alumno 1": projects[i].student_1.lastname,
                    "Codigo del alumno 2": projects[i].student_2.code,
                    "Nombre del alumno 2": projects[i].student_2.firstname,
                    "Apellido del alumno 2": projects[i].student_2.lastname,
                    "Codigo del product owner": projects[i].product_owner.code,
                    "Nombre del product owner": projects[i].product_owner.firstname,
                    "Apellido del product owner": projects[i].product_owner.lastname,
                    "Codigo del manager de portafolio": projects[i].portfolio_manager.code,
                    "Nombre del manager de portafolio": projects[i].portfolio_manager.firstname,
                    "Apellido del manager de portafolio": projects[i].portfolio_manager.lastname,
                    "Codigo del coautor": projects[i].co_autor.code,
                    "Nombre del coautor": projects[i].co_autor.firstname,
                    "Apellido del coautor": projects[i].co_autor.lastname,
                    "Nombre de la compañia": projects[i].company.name
                }
                data.push(projecto)
            }
            var xls = json2xls(data);
            fs.writeFileSync(filename, xls, 'binary', (err) => {
                if (err) {
                    reject({
                        codeMessage: 'MISSING_INFORMATION',
                        message: 'Enviar informacion completa'
                    })
                }

            });
            resolve(true)
        }
        else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Enviar informacion completa'
            })
        }
    })
}

//list por semestre
exports.listBySemesterV1 = function (data) {
    return new Promise(function (resolve, reject) {
        if (data.semester) {
            const semester = data.semester;
            mysqlConnection.query({
                sql:
                    `SELECT 
                        p.id, 
                        p.code, 
                        p.name, 
                        p.description, 
                        p.general_objective, 
                        p.specific_objetive_1 as specific_objective_1,
                        p.specific_objetive_2 as specific_objective_2,
                        p.specific_objetive_3 as specific_objective_3,
                        p.specific_objetive_4 as specific_objective_4,
                        p.paper,
                        p.devices,
                        p.devices_description,
                        p.url_file,
                        p.url_sharepoint,
                        ca.id as 'career.id',
                        ca.name as 'career.name',
                        ca2.id as 'career_2.id',
                        ca2.name as 'career_2.name',
                        state.id as 'project_process_state.id',
                        state.name as 'project_process_state.name',
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
                        powner.id as 'product_owner.id',
                        powner.code as 'product_owner.code',
                        powner.firstname as 'product_owner.firstname',
                        powner.lastname as 'product_owner.lastname',
                        pmanager.id as 'portfolio_manager.id',
                        pmanager.code as 'portfolio_manager.code',
                        pmanager.firstname as 'portfolio_manager.firstname',
                        pmanager.lastname as 'portfolio_manager.lastname',
                        coautor.id as 'co_autor.id',
                        coautor.code as 'co_autor.code',
                        coautor.firstname as 'co_autor.firstname',
                        coautor.lastname as 'co_autor.lastname',
                        comp.id as 'company.id',
                        comp.name as 'company.name',
                        comp.image as 'company.image',
                        s.id as 'semester.id',
                        s.name as 'semester.name'
                        FROM project p
                        left join career ca on ca.id = p.career_id
                        left join career ca2 on ca2.id = p.career_id_2
                        left join  project_process_state state on state.id = p.project_process_state_id
                        left join db_pmo_dev.group g on g.id = p.group_id
                        left join user u1 on u1.id = g.student_1_id
                        left join user u2 on u2.id = g.student_2_id
                        left join career c1 on c1.id = u1.career_id
                        left join career c2 on c2.id = u2.career_id
                        left join user pmanager on pmanager.id = p.portfolio_manager_id
                        left join user coautor on coautor.id = p.co_autor_id
                        left join user powner on powner.id = p.product_owner_id
                        left join company comp on comp.id = p.company_id
                        left join semester s on p.semester_id = s.id
                        where s.name = "${semester}"
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
        }
        else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Enviar informacion completa'
            })
        }
    })
}

exports.listBySemesterV2 = function (data) {
    return new Promise(async function (resolve, reject) {
        if (data.semester) {
            const semester = data.semester;
            const s = await semesterModel.findOne({
                where:{
                    name:semester
                }
            })
            projectModel.findAll({include:{all: true, nested: true}},{
                where:{
                    semester_id:s.getDataValue('id')
                }
            }).then(proyectos=>{
                resolve(proyectos)
            }).catch(error=>{
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            })
        }
        else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Enviar informacion completa'
            })
        }
    })
}

//get data
exports.getDataV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `select id, name from career`
        }, function (error, result, fields) {
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
            else {
                const carreras = result;
                mysqlConnection.query({
                    sql: `select id, name from semester`
                }, function (error, result, fields) {
                    if (error) {
                        reject({
                            codeMessage: error.code ? error.code : 'ER_',
                            message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                        })
                    }
                    else {
                        const semester = result
                        mysqlConnection.query({
                            sql: `select id, name from company`
                        }, function (error, result, fields) {
                            if (error) {
                                reject({
                                    codeMessage: error.code ? error.code : 'ER_',
                                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                                })
                            }
                            else {
                                const company = result
                                resolve({ company, semester, carreras })
                            }
                        })
                    }
                })
            }
        })
    })
}

exports.getDataV2 = function () {
    return new Promise(function (resolve, reject) {
        careerModel.findAll({
            attributes:[id,name]
        }).then(carreras=>{
            semesterModel.findAll({
                attributes:[id,name]
            }).then(semester=>{
                companyModel.findAll({
                    attributes:[id,name]
                }).then(company=>{
                    resolve({ company, semester, carreras })
                }).catch(error=>{
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                    })
                })
            }).catch(error=>{
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            })
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}