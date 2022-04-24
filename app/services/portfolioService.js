const { mysqlConnection } = require('../connections/mysql');


exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT 
            po.id as 'portfolio.id',
            po.name as 'portfolio.name',
            se.id as 'semester.id',
            se.name as 'semester.name',
            ps.id as 'portfolio_state.id',
            ps.state as 'portfolio_state.state',
            (select count(*) from  project p where po.id = p.portfolio_id) as cantidad
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

exports.savePortfolio = function (portfolio) {
    return new Promise(function (resolve, reject) {
        if (portfolio.name && portfolio.semester_id && portfolio.portfolio_state_id) {
            mysqlConnection.query({
                sql: 'INSERT INTO portfolio (`name`, `semester_id`, `portfolio_state_id`) VALUES (?,?,?)',
            }, [portfolio.name, portfolio.semester_id, portfolio.portfolio_state_id], function (error, result, fields) {
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
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for project'
            })
        }
    })
}