const { portfolioService } = require('../services')
var dot = require('dot-object');
const { endpoints } = require('../constants');

const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN

exports.getFullList = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        portfolioService.getAllV1().then(function (result) {
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
        portfolioService.getAllV2().then(function (result) {
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
    }
    
}

exports.savePortfolio = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        portfolioService.savePortfolioV1(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result.data,
                    message: 'Portfolio with id ' + result.id + ' created successfully',
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
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        portfolioService.savePortfolioV2(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result.data,
                    message: 'Portfolio with id ' + result.id + ' created successfully',
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