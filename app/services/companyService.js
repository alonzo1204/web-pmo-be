const { companyModel } = require('../models');


exports.getFullList =function(){
    return new Promise(function(resolve,reject){
        companyModel.findAll().then(careers=>{
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
            sql: 'SELECT id, name, image from company',
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

exports.saveCompany = function (company,path) {
    console.log(company.body.name)
    return new Promise(function (resolve, reject) {
        if (company.body.name && path) {
            mysqlConnection.query({
                sql: 'INSERT INTO company (`name`, `image`) VALUES (?,?)',
            }, [company.body.name, path], function (error, result, fields) {
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