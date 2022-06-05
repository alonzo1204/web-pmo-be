const { endpoints } = require('../constants');
const { SemesterService } = require('../services');

const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN

exports.getFullList = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        SemesterService.getFullListV1().then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send({
                    code: error.codeMessage,
                    message: error.message
                })
            }
        })
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        SemesterService.getFullListV2().then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send({
                    code: error.codeMessage,
                    message: error.message
                })
            }
        })
    }
}

exports.createSemester = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        SemesterService.createSemesterV1(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'semester ' + result.insertId + ' created successfully',
                    idPosition: result.groupid
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send({
                    code: error.codeMessage,
                    message: error.message
                })
            }
        })
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        SemesterService.createSemesterV2(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'semester ' + result.insertId + ' created successfully',
                    idPosition: result.groupid
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send({
                    code: error.codeMessage,
                    message: error.message
                })
            }
        })
    }
}