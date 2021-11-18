const { mysqlConnection } = require('../connections/mysql');

exports.getFullList = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `SELECT 
                    p.id, 
                    p.accepted, 
                    p.iteration, 
                    p.postulation_date, 
                    p.group_weighted_average,

                    stud_1.id as 'student_1.id',
                    stud_1.code as 'student_1.code',
                    stud_1.firstname as 'student_1.firstname',
                    stud_1.lastname as 'student_1.lastname',

                    stud_2.id as 'student_2.id',
                    stud_2.code as 'student_2.code',
                    stud_2.firstname as 'student_2.firstname',
                    stud_2.lastname as 'student_2.lastname',
                    
                    proj1.id as 'proj1.id', 
                    proj1.code as 'proj1.code', 
                    proj1.name as 'proj1.name', 
                    proj1.description as 'proj1.description', 
                    proj1.general_objective as 'proj1.general_objective', 
                    proj1.specific_objetive_1 as 'proj1.specific_objective_1',
                    proj1.specific_objetive_2 as 'proj1.specific_objective_2',
                    proj1.specific_objetive_3 as 'proj1.specific_objective_3',
                    proj1.specific_objetive_4 as 'proj1.specific_objective_4',
                    proj1.paper as 'proj1.paper',
                    proj1.devices as 'proj1.devices',
                    proj1.url_file as 'proj1.url_file',
                    proj1.url_sharepoint as 'proj1.url_sharepoint',

                    proj2.id as 'proj2.id', 
                    proj2.code as 'proj2.code', 
                    proj2.name as 'proj2.name', 
                    proj2.description as 'proj2.description', 
                    proj2.general_objective as 'proj2.general_objective', 
                    proj2.specific_objetive_1 as 'proj2.specific_objective_1',
                    proj2.specific_objetive_2 as 'proj2.specific_objective_2',
                    proj2.specific_objetive_3 as 'proj2.specific_objective_3',
                    proj2.specific_objetive_4 as 'proj2.specific_objective_4',
                    proj2.paper as 'proj2.paper',
                    proj2.devices as 'proj2.devices',
                    proj2.url_file as 'proj2.url_file',
                    proj2.url_sharepoint as 'proj2.url_sharepoint',

                    proj3.id as 'proj1.id', 
                    proj3.code as 'proj1.code', 
                    proj3.name as 'proj1.name', 
                    proj3.description as 'proj1.description', 
                    proj3.general_objective as 'proj1.general_objective', 
                    proj3.specific_objetive_1 as 'proj1.specific_objective_1',
                    proj3.specific_objetive_2 as 'proj1.specific_objective_2',
                    proj3.specific_objetive_3 as 'proj1.specific_objective_3',
                    proj3.specific_objetive_4 as 'proj1.specific_objective_4',
                    proj3.paper as 'proj1.paper',
                    proj3.devices as 'proj1.devices',
                    proj3.url_file as 'proj1.url_file',
                    proj3.url_sharepoint as 'proj1.url_sharepoint',

                    proj4.id as 'proj4.id', 
                    proj4.code as 'proj4.code', 
                    proj4.name as 'proj4.name', 
                    proj4.description as 'proj4.description', 
                    proj4.general_objective as 'proj4.general_objective', 
                    proj4.specific_objetive_1 as 'proj4.specific_objective_1',
                    proj4.specific_objetive_2 as 'proj4.specific_objective_2',
                    proj4.specific_objetive_3 as 'proj4.specific_objective_3',
                    proj4.specific_objetive_4 as 'proj4.specific_objective_4',
                    proj4.paper as 'proj4.paper',
                    proj4.devices as 'proj4.devices',
                    proj4.url_file as 'proj4.url_file',
                    proj4.url_sharepoint as 'proj4.url_sharepoint',

                    projAssigned.id as 'projAssigned.id', 
                    projAssigned.code as 'projAssigned.code', 
                    projAssigned.name as 'projAssigned.name', 
                    projAssigned.description as 'projAssigned.description', 
                    projAssigned.general_objective as 'projAssigned.general_objective', 
                    projAssigned.specific_objetive_1 as 'projAssigned.specific_objective_1',
                    projAssigned.specific_objetive_2 as 'projAssigned.specific_objective_2',
                    projAssigned.specific_objetive_3 as 'projAssigned.specific_objective_3',
                    projAssigned.specific_objetive_4 as 'projAssigned.specific_objective_4',
                    projAssigned.paper as 'projAssigned.paper',
                    projAssigned.devices as 'projAssigned.devices',
                    projAssigned.url_file as 'projAssigned.url_file',
                    projAssigned.url_sharepoint as 'projAssigned.url_sharepoint'

                    from postulation p
                    left join user stud_1 on stud_1.id = p.student_1_id
                    left join user stud_2 on stud_2.id = p.student_2_id
                    left join project proj1 on proj1.id = p.project_1_id
                    left join project proj2 on proj2.id = p.project_2_id
                    left join project proj3 on proj3.id = p.project_3_id
                    left join project proj4 on proj4.id = p.project_4_id
                    left join project projAssigned on projAssigned.id = p.project_assigned`,
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