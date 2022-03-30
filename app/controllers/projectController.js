const { ProjectService } = require('../services');
var dot = require('dot-object');
const fs = require('fs');
var xlsx = require("xlsx");

exports.getFullList = function (req, res) {
    ProjectService.getFullList().then(function (result) {

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

exports.save = function (req, res) {
    ProjectService.save(req.body).then(function (result) {

        if (result) {
            return res.status(200).send({
                data: result,
                message: 'Project with id ' + result.insertId + ' created successfully',
                idPosition: result.insertId
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

exports.saveExcel = function (req, res, callback)  {
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload an excel file!");
        }
        let path =
      __basedir + "/recursos/uploads/" + req.file.filename;
        var workbook = xlsx.readFile(path);
        
        //Solo funcionara cuando haya una hoja llamada CargaMasiva
        var worksheet = workbook.Sheets["CargaMasiva"];
        var datos = xlsx.utils.sheet_to_json(worksheet);
        for (let index = 0; index < datos.length; index++) {
            const element = datos[index];
            if (element.project_process_state_id==null)element.project_process_state_id=6;
            ProjectService.saveExcel(element).then(function (result) {
                if (result) {
                    //send no funciona por alguna razon
                    return res.status(200).status({
                        data: result,
                        message: 'Project with id ' + result.insertId + ' created successfully',
                        idPosition: result.insertId
                    })
                }
            }, function (error) {
                if (error) {
                    console.log("ww")
                    //send no funciona por alguna razon
                    return res.status(401).status({
                        code: error.codeMessage,
                        message: error.message,
                    });
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
    
    }catch(error){
        
        console.log(error);
        res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
    
   return callback({status:200, ok:true, message: 'Archivo guardado'}) ;
    
}
