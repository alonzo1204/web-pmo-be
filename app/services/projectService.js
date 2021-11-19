const { mysqlConnection } = require('../connections/mysql');

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

                    cy.id as 'cycle.id',
                    cy.name as 'cycle.name',

                    state.id as 'project_process_state.id',
                    state.name as 'project_process_state.name',

                    stud_1.id as 'student_1.id',
                    stud_1.code as 'student_1.code',
                    stud_1.firstname as 'student_1.firstname',
                    stud_1.lastname as 'student_1.lastname',

                    stud_2.id as 'student_2.id',
                    stud_2.code as 'student_2.code',
                    stud_2.firstname as 'student_2.firstname',
                    stud_2.lastname as 'student_2.lastname',

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

                    from project p
                    left join career ca on ca.id = p.career_id
                    left join cycle cy on cy.id = p.cycle_id
                    left join project_process_state state on state.id = p.project_process_state_id
                    left join user stud_1 on stud_1.id = p.student_1_id
                    left join user stud_2 on stud_2.id = p.student_2_id
                    left join user powner on powner.id = p.product_owner_id
                    left join user pmanager on pmanager.id = p.portfolio_manager_id
                    left join user coautor on coautor.id = p.co_autor_id
                    left join company comp on comp.id = p.company_id`,
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