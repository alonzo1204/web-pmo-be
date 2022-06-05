const { groupService } = require('../services');
var dot = require('dot-object');
const { endpoints } = require('../constants');
const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN

exports.save = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        groupService.saveV1(req.body).then(function (result) {

            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'group' + result.insertId + ' created successfully',
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
        groupService.saveV2(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'group' + result.id + ' created successfully',
                    idPosition: result.id
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

exports.getgroup = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        groupService.getgroupV1(req.user.token.information.code).then(function (result) {
            if (result) {
                result.map(r => dot.object(r));
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
        groupService.getgroupV2(req.user.token.information.id).then(function (result) {
            if (result) {
                //result.map(r => dot.object(r));
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