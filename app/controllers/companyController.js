const { CompanyService } = require('../services');
var dot = require('dot-object');

exports.getFullList = function (req, res) {
    CompanyService.getFullList().then(function (result) {

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

exports.saveCompany = function (req, res)  {
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload a image!");
        }
        let path =
        __basedir + "/recursos/images/" + req.file.filename;
        
        CompanyService.saveCompany(req,path).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
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