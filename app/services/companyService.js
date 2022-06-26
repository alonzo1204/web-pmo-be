const { mysqlConnection } = require('../connections');
const { companyModel } = require('../models/index');


exports.getFullListV1 = function () {
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
}

exports.getFullListV2 =function(){
    return new Promise(function(resolve,reject){
        companyModel.findAll().then(company=>{
            resolve(company);
        }).catch(error=>{
            reject(error);
        })
    })
};


//Save Company
exports.saveCompanyV1 = function (company,path) {
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

exports.saveCompanyV2 = function(company,path){
    return new Promise(function(resolve,reject){
        if (company.body.name && path) {
            companyModel.create({
                name:company.body.name,
                image:path
            }).then(newCompany=>{
                resolve(newCompany)
            }).catch(error=>{
                reject(error);
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for project'
            })
        }
    })
};

