const { UserService, AuthService } = require('../services');
var dot = require('dot-object');
var xlsx = require("xlsx");
const fs = require('fs');
const { endpoints } = require('../constants');
const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN


exports.getFullList = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        UserService.getFullListV1().then(function (result) {
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
        UserService.getFullListV2().then(function (result) {
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

exports.getFullListTeachers = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        UserService.getFullListTeachersV1().then(function (result) {
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
        UserService.getFullListTeachersV2().then(function (result) {
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

exports.darBaja = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        UserService.BajaV1(req).then(function (result) {
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
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        UserService.BajaV2(req).then(function (result) {
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
}

exports.ActualizarInglesMasivo = function (req, res, callback) {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path =
            __basedir + "/recursos/uploads/" + req.file.filename;
        var workbook = xlsx.readFile(path);
        //Solo funcionara cuando haya una hoja llamada Hoja1
        var worksheet = workbook.Sheets["CargaMasiva"];
        var datos = xlsx.utils.sheet_to_json(worksheet);
        if(req.baseUrl==URLBASE_MYSQLCONN){
            for (let index = 0; index < datos.length; index++) {
                const element = datos[index];
                if (element.english == 'SI') {
                    element.english = 1
                }
                if (element.english == 'NO') {
                    element.english = 2
                }
                UserService.CargaMasivaInglesV1(element).then(function (result) {
                    if (result) {
                        nCorrectos += 1;
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
            return res.status(200).send({
                confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,
            })    
        }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
            for (let index = 0; index < datos.length; index++) {
                const element = datos[index];
                if (element.english == 'SI') {
                    element.english = 1
                }
                if (element.english == 'NO') {
                    element.english = 2
                }
                UserService.CargaMasivaInglesV2(element).then(function (result) {
                    if (result) {
                        nCorrectos += 1;
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
            return res.status(200).send({
                confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,
            })    
        }    
        
    } catch (error) {

        console.log(error);
        return res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}

exports.ActualizarPromedioMasivo = function (req, res, callback) {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path =
            __basedir + "/recursos/uploads/" + req.file.filename;
        var workbook = xlsx.readFile(path);
        //Solo funcionara cuando haya una hoja llamada Hoja1
        var worksheet = workbook.Sheets["CargaMasiva"];
        var datos = xlsx.utils.sheet_to_json(worksheet);
        if(req.baseUrl==URLBASE_MYSQLCONN){
            for (let index = 0; index < datos.length; index++) {
                const element = datos[index];
                UserService.CargaMasivaPromedioV1(element).then(function (result) {
                    if (result) {
                        nCorrectos += 1;
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
            return res.status(200).send({
                confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,
            })
        }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
            for (let index = 0; index < datos.length; index++) {
                const element = datos[index];
                UserService.CargaMasivaPromedioV2(element).then(function (result) {
                    if (result) {
                        nCorrectos += 1;
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
            return res.status(200).send({
                confirmacion: "Se subio correctamente el archivo: " + req.file.originalname,
            })
        }    
    } catch (error) {

        console.log(error);
        return res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}

// Para el register_permission
exports.RegistroMasivoAceptar =async function (req, res, callback)  {
    if(req.baseUrl==URLBASE_MYSQLCONN){
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
                await UserService.CargaMasivaPermisosV1(element).then(function (result) {
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
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
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
                await UserService.CargaMasivaPermisosV2(element).then(function (result) {
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
}

// Para el register_permission
exports.RegistroMasivoBloqueados =async function (req, res, callback)  {
    if(req.baseUrl==URLBASE_MYSQLCONN){
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
                await UserService.CargaMasivaPermisosBloqueadosV1(element).then(function (result) {
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
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
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
                await UserService.CargaMasivaPermisosBloqueadosV2(element).then(function (result) {
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
}


exports.changeName = function (req, res, callback) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        UserService.changeNameV1(req.body).then(function (result) {
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
        UserService.changeNameV2(req.body).then(function (result) {
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