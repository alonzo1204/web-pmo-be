const { mysqlConnection } = require('../connections/mysql');

exports.getFullList = function () {
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
                
                se.id as 'semester.id',
                se.name as 'semester.name',
                
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
                from project p, career ca, semester se, project_process_state state, db_pmo_dev.group g, user u1, user u2, user pmanager, user coautor, user powner, company comp
                where
                p.career_id = ca.id and 
                p.semester_id = se.id and 
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

exports.save = function (project) {
    return new Promise(function (resolve, reject) {
        if (project.code && project.name && project.description && project.general_objective && project.paper && project.devices && project.career_id && project.semester_id && project.project_process_state_id && project.company) {

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
                        sql: 'INSERT INTO project (`code`, `name`, `description`, `general_objective`, `specific_objetive_1`, `specific_objetive_2`, `specific_objetive_3`, `specific_objetive_4`, `paper`, `devices`, `url_file`, `url_sharepoint`, `career_id`, `semester_id`, `group_id`, `portfolio_manager_id`, `co_autor_id`, `project_process_state_id`, `company_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    }, [
                        project.code, project.name,
                        project.description, project.general_objective,
                        project.specific_objetive_1, project.specific_objetive_2,
                        project.specific_objetive_3, project.specific_objetive_4,
                        project.paper, project.devices,
                        project.url_file, project.url_sharepoint,
                        project.career_id, project.semester_id,
                        project.group_id,
                        project.product_owner_id, project.portfolio_manager_id,
                        project.co_autor_id, project.project_process_state_id, project.company], function (error, result, fields) {
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
        if ((project.code && project.name && project.paper && project.devices && project.career_id && project.semester_id && project.company) >= 0) {

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
                        sql: 'INSERT INTO project (`code`, `name`, `description`, `general_objective`, `specific_objetive_1`, `specific_objetive_2`, `specific_objetive_3`, `specific_objetive_4`, `paper`, `devices`, `url_file`, `url_sharepoint`, `career_id`, `semester_id`, `group_id`, `product_owner_id`, `portfolio_manager_id`, `co_autor_id`, `project_process_state_id`, `company_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    }, [
                        project.code, project.name,
                        project.description, project.general_objective,
                        project.specific_objetive_1, project.specific_objetive_2,
                        project.specific_objetive_3, project.specific_objetive_4,
                        project.paper, project.devices,
                        project.url_file, project.url_sharepoint,
                        project.career_id, project.semester_id,
                        project.group_id,
                        project.product_owner_id, project.portfolio_manager_id,
                        project.co_autor_id, project.project_process_state_id, project.company], function (error, result, fields) {

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