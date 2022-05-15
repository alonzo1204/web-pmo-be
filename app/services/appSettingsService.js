const { mysqlConnection } = require('../connections/mysql');
const { portfolioModel, semesterModel, portfolioStateModel } = require('../models');
const { appSettingsModel } = require('../models/appSettingsModel');


exports.getConfiguration =function(){
    return new Promise(function(resolve,reject){
        appSettingsModel.findAll({
            include:[{
                model:portfolioModel,
                include:[semesterModel,portfolioStateModel]
        }]
        }).then(configuracion=>{
            resolve(configuracion);
        }).catch(error=>{
            reject(error);
        })
    })
};
/*
exports.getConfiguration = function(configID){
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT 
            a.front_url, 
            a.back_url, 

            p.id as 'portfolio.id',
            p.name as 'portfolio.name',
            ps.id as 'portfolio_state.id',
            ps.state as 'portfolio_state.state',
            s.id as 'semester.id', 
            s.name as 'semester.name', 
            s.date_from as 'semester.date_from', 
            s.date_until as 'semester.date_until'

            from application_settings a, portfolio p, semester s, portfolio_state ps

            where a.id = ? and p.id=a.portfolio_id and s.id=p.semester_id and ps.id = p.portfolio_state_id`,
        }, [configID], function (error, result, fields) {
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
*/
exports.editConfiguration = function(config){
    console.log(config.params.idConfig)
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT * FROM application_settings a WHERE a.id=?`,
        }, [config.params.idConfig], function (error, result, fields) {
            if (result && result.length > 0) {
                var portfolio_id = config.body.portfolio_id
                var front_url = config.body.front_url
                var back_url = config.body.back_url
                if(portfolio_id==undefined || portfolio_id==null) portfolio_id =result[0].portfolio_id;
                if(front_url==undefined || front_url==null) front_url =result[0].front_url;
                if(back_url==undefined || back_url==null) back_url =result[0].back_url;
                mysqlConnection.query({
                    sql: `UPDATE application_settings a SET a.portfolio_id=?,a.front_url=?,a.back_url=? WHERE a.id=?`,
                }, [portfolio_id,front_url,back_url,config.params.idConfig], function (error, result, fields) {
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
                    message: 'No existe la configuracion con el id '+config.param.idConfig
                })
            }
        })
    })
}