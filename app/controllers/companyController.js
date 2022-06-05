const { CompanyService } = require('../services');
var dot = require('dot-object');
const { endpoints } = require('../constants');

const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN

exports.getFullList = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        CompanyService.getFullListV1().then(function (result) {
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
        CompanyService.getFullListV2().then(function (result) {
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

exports.saveCompany = function (req, res)  {
    //console.log(req.user.settings)
    var direccion = req.user.settings.back_url
    //console.log(req.user.settings.then((resolve)=>{resolve.back_url}).catch(err=>{console.log(err)}))
    if(req.baseUrl==URLBASE_MYSQLCONN){
        try{
            if(req.file == undefined){
                return res.status(400).send("Please upload a image!");
            }
            //console.log(direccion)
            let path =
            direccion + "/recursos/images/" + req.file.filename;
            
            CompanyService.saveCompanyV1(req,path).then(function (result) {
                if (result) {
                    return res.status(200).send({
                        data: result,
                        confirmation: "Se guardo correctamente la empresa.",
                        message: "Se subio correctamente el archivo: " + req.file.originalname,   
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
        }catch(error){
            console.log(error);
            return res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        try{
            if(req.file == undefined){
                return res.status(400).send("Please upload a image!");
            }
            //console.log(direccion)
            let path =
            direccion + "/recursos/images/" + req.file.filename;
            
            CompanyService.saveCompanyV2(req,path).then(function (result) {
                if (result) {
                    return res.status(200).send({
                        data: result,
                        confirmation: "Se guardo correctamente la empresa.",
                        message: "Se subio correctamente el archivo: " + req.file.originalname,   
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
        }catch(error){
            console.log(error);
            return res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }
    
}