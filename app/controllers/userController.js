const { UserService, AuthService } = require('../services');
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

// Para el register_permission
exports.RegistroMasivoAceptar =async function (req, res, callback)  {
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload an excel file!");
        }
        var resultados={ correctos : [], incorrectos : []};
        let path =
      __basedir + "/recursos/uploads/" + req.file.filename;
        var workbook = xlsx.readFile(path);
        
        //Solo funcionara cuando haya una hoja llamada Hoja1
        var worksheet = workbook.Sheets["Hoja1"];
        var datos = xlsx.utils.sheet_to_json(worksheet);
        for (let index = 0; index < datos.length; index++) {
            const element = datos[index];
            
            if (element.semester_id == null || element.semester_id == undefined) element.semester_id = req.user.settings.semester_name;
            await UserService.CargaMasivaPermisos(element).then(function (result) {
                if (result) {
                    resultados.correctos.push(element.code);
                }
            }, function (error) {
                if (error) {
                    resultados.incorrectos.push(element.code);
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
        
        return res.status(200).send({
            confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,
            message: "Se ha cargado el registro",
            correctos: resultados.correctos,
            incorrectos:resultados.incorrectos
        })
    }catch(error){
        
        console.log(error);
        return res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
    
}

// Para el register_permission
exports.RegistroMasivoBloqueados =async function (req, res, callback)  {
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload an excel file!");
        }
        var resultados={ correctos : [], incorrectos : []};
        let path =
      __basedir + "/recursos/uploads/" + req.file.filename;
        var workbook = xlsx.readFile(path);
        
        //Solo funcionara cuando haya una hoja llamada Hoja1
        var worksheet = workbook.Sheets["Hoja1"];
        var datos = xlsx.utils.sheet_to_json(worksheet);
        for (let index = 0; index < datos.length; index++) {
            const element = datos[index];
            if (element.semester_id == null || element.semester_id == undefined) element.semester_id = req.user.settings.semester_name;
            await UserService.CargaMasivaPermisosBloqueados(element).then(function (result) {
                if (result) {
                    resultados.correctos.push(element.code);
                }
            }, function (error) {
                if (error) {
                    resultados.incorrectos.push(element.code);
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
        
        return res.status(200).send({
            confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,
            message: "Se ha cargado el registro",
            correctos: resultados.correctos,
            incorrectos: resultados.incorrectos
        })
    }catch(error){
        
        console.log(error);
        return res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
    
}
