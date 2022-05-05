const { mysqlConnection } = require('../connections/mysql');
const { setQuery, security, setHandleQuery, validProject } = require('../constants');

const jwt = require('jsonwebtoken');

exports.getFullList = function () {
    return new Promise(function (resolve, reject) {
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
                FROM project p
                left join career ca on ca.id = p.career_id
                left join  project_process_state state on state.id = p.project_process_state_id
                left join db_pmo_dev.group g on g.id = p.group_id
                left join user u1 on u1.id = g.student_1_id
                left join user u2 on u2.id = g.student_2_id
                left join user pmanager on pmanager.id = p.portfolio_manager_id
                left join user coautor on coautor.id = p.co_autor_id
                left join user powner on powner.id = p.product_owner_id
                left join company comp on comp.id = p.company_id
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

exports.save = function (project) {
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

exports.saveExcel = function (project) {
    return new Promise(function (resolve, reject) {
        if ((project.code && project.name && project.paper && project.devices && project.career_id && project.semester_id && project.company_id) >= 0) {

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
                        sql: 'INSERT INTO project (`code`, `name`, `description`, `general_objective`, `specific_objetive_1`, `specific_objetive_2`, `specific_objetive_3`, `specific_objetive_4`, `paper`, `devices`, `url_file`, `url_sharepoint`, `career_id`, `semester_id`, `group_id`, `portfolio_id`, `product_owner_id`, `portfolio_manager_id`, `co_autor_id`, `project_process_state_id`, `company_id`, `comments`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    }, [
                        project.code, project.name,
                        project.description, project.general_objective,
                        project.specific_objetive_1, project.specific_objetive_2,
                        project.specific_objetive_3, project.specific_objetive_4,
                        project.paper, project.devices,
                        project.url_file, project.url_sharepoint,
                        project.career_id, project.semester_id,
                        project.group_id, project.portfolio_id,
                        project.product_owner_id, project.portfolio_manager_id,
                        project.co_autor_id, project.project_process_state_id, project.company_id, project.comments], function (error, result, fields) {

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

exports.getProyectByStatus = function (idProjectProcess) {
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

exports.Rechazar = function (project) {
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = 3, update_date = CURRENT_TIMESTAMP WHERE p.code = ?',
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

exports.Aprobar = function (project) {
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = 2, update_date = CURRENT_TIMESTAMP WHERE p.code = ?',
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

exports.AprobarComentarios = function (project, comentarios) {
    console.log(comentarios)
    var code = project.params.idProject;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = 4, p.comments = ?, update_date = CURRENT_TIMESTAMP WHERE p.code = ?',
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

exports.saveArchivo = function (project, path) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.url_file = ?, p.url_sharepoint=?, update_date = CURRENT_TIMESTAMP WHERE p.code = ?',
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

exports.updateState = function (ids) {
    var code = ids.params.idProject;
    var project_process_state_id = ids.params.idState;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE project p SET p.project_process_state_id = ?, update_date = CURRENT_TIMESTAMP WHERE p.code = ?',
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

exports.updateProject = function (project) {
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

exports.sendUpdateRequest = function (project, token_inf) {
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


exports.handleUpdate = function (req) {
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

exports.mutipleUpdates = (arr) => {
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
                                        company_id= ${project.company_id}, group_id= ${project.group_id}, portfolio_id= ${project.portfolio_id}, semester_id= ${project.semester_id}, comments = "${project.comments}, update_date = CURRENT_TIMESTAMP" where code = "${project.code}"`
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

exports.getProyectByStatusVarious = function (idProjectProcess) {
    var state_ids = idProjectProcess.params.idState;
    return new Promise(function (resolve, reject) {
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
			FROM project p
            left join career ca on ca.id = p.career_id
            left join  project_process_state state on state.id = p.project_process_state_id
            left join db_pmo_dev.group g on g.id = p.group_id
            left join user u1 on u1.id = g.student_1_id
            left join user u2 on u2.id = g.student_2_id
            left join user pmanager on pmanager.id = p.portfolio_manager_id
            left join user coautor on coautor.id = p.co_autor_id
            left join user powner on powner.id = p.product_owner_id
            left join company comp on comp.id = p.company_id
            where p.project_process_state_id in (${state_ids})
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
    })
}

//Solicitud de mi Cambio
exports.getMyEditRequest = function (idUser) {
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

//Solicitudes de cambios
exports.getEditRequest = function () {
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

exports.saveWithArchive = function (project,path) {
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
