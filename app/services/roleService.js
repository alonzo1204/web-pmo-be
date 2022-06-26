const { mysqlConnection } = require('../connections');
const { roleModel } = require('../models/index');


exports.getFullListV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT id, name from role',
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
        roleModel.findAll({include:{all: true, nested: true}}).then(careers=>{
            resolve(careers);
        }).catch(error=>{
            reject(error);
        })
    })
};


