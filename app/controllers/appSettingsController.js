const { AppSettingsService } = require('../services');


var dot = require('dot-object');
const { appSettingsModel } = require('../models/appSettingsModel');

exports.getConfig = function (req, res) {
    AppSettingsService.getConfiguration().then(function (result){
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
    AppSettingsService.editConfiguration(req).then(function (result) {
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
