const { mysqlConnection } = require('../connections');
const { semesterModel } = require('../models');


exports.getFullListV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT id, name, date_from, date_until from semester',
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
        semesterModel.findAll({include:{all: true, nested: true}}).then(careers=>{
            resolve(careers);
        }).catch(error=>{
            reject(error);
        })
    })
};

//crear semestres
exports.createSemesterV1 = function (project) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `insert into semester (name,date_from,date_until) values ("${project.name}","${project.date_from}","${project.date_until}")`,
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

exports.createSemesterV2 = function (project) {
    return new Promise(function (resolve, reject) {
        semesterModel.create({
            name:project.name,
            date_from:project.date_from,
            date_until:project.date_until
        }).then(newSemester=>{
            resolve(newSemester)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}