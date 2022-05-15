const { careerModel } = require('../models');


exports.getFullList =function(){
    return new Promise(function(resolve,reject){
        careerModel.findAll().then(careers=>{
            resolve(careers);
        }).catch(error=>{
            reject(error);
        })
    })
};

/*
exports.getFullList = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT id, name from career',
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
}*/