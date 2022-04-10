const { mysqlConnection } = require('../connections/mysql');


exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT 
            po.id as 'Portfolio.id',
            po.name as 'Portfolio.name',
            se.id as 'Semester.id',
            se.name as 'Semester.name',
            ps.id as 'Portfolio_state.id',
            ps.state as 'Portfolio_state.state',
            (select count(*) from  project p where po.id = p.portfolio_id) as Cantidad
           from
            portfolio po, semester se, portfolio_state ps
           where
            po.semester_id = se.id and po.portfolio_state_id = ps.id 
           group by po.id
            `,
        }, function (error, result, fields) {
            if (result) {
                resolve(result)
            } else {
                resolve(null);
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