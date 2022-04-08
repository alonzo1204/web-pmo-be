const { UserService } = require('../services');
var dot = require('dot-object');
var xlsx = require("xlsx");
const fs = require('fs');

exports.getFullList = function (req, res) {
    UserService.getFullList().then(function (result) {

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

exports.darBaja = function (req, res) {

    UserService.Baja(req).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result,
                message: 'User with code ' + req.params.idUser + ' state updated succesfully',
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
global.nCorrectos = 0;
global.Incorrectos = [];
// Para el register_permission
exports.RegistroMasivo = function (req, res, callback)  {
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload an excel file!");
        }
        let path =
      __basedir + "/recursos/uploads/" + req.file.filename;
        var workbook = xlsx.readFile(path);
        
        //Solo funcionara cuando haya una hoja llamada Hoja1
        var worksheet = workbook.Sheets["Hoja1"];
        var datos = xlsx.utils.sheet_to_json(worksheet);
        for (let index = 0; index < datos.length; index++) {
            const element = datos[index];
            if (element.project_process_state_id==null)element.project_process_state_id=6;
            UserService.CargaMasivaPermisos(element).then(function (result) {
                if (result) {
                    nCorrectos+=1;
                }
            }, function (error) {
                if (error) {
                    console.log(element.code);
                }
            })
        
        }
        //borra el excel
        fs.unlink(path, (err) => {
            if (err) {
                throw err;
            }
            console.log("File is deleted.");
        });
        console.log(Incorrectos)
        return res.status(200).send({
           confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,   
           })
    }catch(error){
        
        console.log(error);
        return res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
    
}

// Para el register_permission
exports.RegistroMasivoBloqueados = function (req, res, callback)  {
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload an excel file!");
        }
        let path =
      __basedir + "/recursos/uploads/" + req.file.filename;
        var workbook = xlsx.readFile(path);
        
        //Solo funcionara cuando haya una hoja llamada Hoja1
        var worksheet = workbook.Sheets["Hoja1"];
        var datos = xlsx.utils.sheet_to_json(worksheet);
        for (let index = 0; index < datos.length; index++) {
            const element = datos[index];
            if (element.project_process_state_id==null)element.project_process_state_id=6;
            UserService.CargaMasivaPermisosBloqueados(element).then(function (result) {
                if (result) {
                    nCorrectos+=1;
                }
            }, function (error) {
                if (error) {
                    console.log(element.code);
                }
            })
        
        }
        //borra el excel
        fs.unlink(path, (err) => {
            if (err) {
                throw err;
            }
            console.log("File is deleted.");
        });
        console.log(Incorrectos)
        return res.status(200).send({
           confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,   
           })
    }catch(error){
        
        console.log(error);
        return res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
    
}