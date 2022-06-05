const { AppSettingsService } = require('../services');
const { endpoints } = require('../constants');
var dot = require('dot-object');
const { appSettingsModel } = require('../models/appSettingsModel');

const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN


exports.getConfig = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        AppSettingsService.getConfigurationV1().then(function (result){
            if(result){
                result.map(r => dot.object(r));
                return res.status(200).send({
                    data: result,
                })
            }
        },function(error){
            if (error) {
                return res.status(401).send({
                    code: error.codeMessage,
                    message: error.message
                })
            }                    
        })
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        AppSettingsService.getConfigurationV2().then(function (result){
            if(result){
                result.map(r => dot.object(r));
                return res.status(200).send({
                    data: result,
                })
            }
        },function(error){
            if (error) {
                return res.status(401).send({
                    code: error.codeMessage,
                    message: error.message
                })
            }                    
        })
    }
    
}

/*
exports.getConfig = function (req, res) {
    AppSettingsService.getConfiguration(req.params.idConfig).then(function (result) {
        if (result) {
            console.log(result)
            result.map(r => dot.object(r));
            return res.status(200).send({
                
                data: result,
                
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
*/
exports.editConfig = function (req, res) {
    AppSettingsService.editConfiguration(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result,
                message: "Se consiguio cambiar la configuracion del sistema con exito."
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
