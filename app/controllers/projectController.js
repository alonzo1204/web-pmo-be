const { ProjectService } = require('../services');
const { endpoints } = require('../constants');
var dot = require('dot-object');
const fs = require('fs');
var xlsx = require("xlsx");
const { EOL } = require('os');
const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN

exports.getFullList = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.getFullListV1().then(function (result) {
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
        ProjectService.getFullListV2().then(function (result) {

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

exports.save = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.saveV1(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result.data,
                    message: 'Project with id ' + result.id + ' created successfully',
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
        ProjectService.saveV2(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result.data,
                    message: 'Project with id ' + result.id + ' created successfully',
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

exports.saveExcel =async function (req, res, callback) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        try {
            if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
            }
            var resultados={ correctos : [], incorrectos : []};
            let path =
                __basedir + "/recursos/uploads/" + req.file.filename;
            var workbook = xlsx.readFile(path);
    
            //Solo funcionara cuando haya una hoja llamada CargaMasiva
            var worksheet = workbook.Sheets["CargaMasiva"];
            var datos = xlsx.utils.sheet_to_json(worksheet);
            for (const element of datos) {
                element.project_process_state_id = 1;
                if (element.portfolio_id == null || element.portfolio_id == undefined) element.portfolio_id = req.user.settings.portfolio_id;
                await ProjectService.saveExcelV1(element).then(function (result) {
                    if (result) {
                        resultados.correctos.push(element.code);
                        return element.code;
                    }
                }, function (error) {
                    if (error) {
                        resultados.incorrectos.push(element.code);
                        
                        return element.code;
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
                message: "Se han cargado los proyectos",
                correctos: resultados.correctos,
                incorrectos:resultados.incorrectos
            })
        } catch (error) {
    
            console.log(error);
            return res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        try {
            if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
            }
            var resultados={ correctos : [], incorrectos : []};
            let path =
                __basedir + "/recursos/uploads/" + req.file.filename;
            var workbook = xlsx.readFile(path);
    
            //Solo funcionara cuando haya una hoja llamada CargaMasiva
            var worksheet = workbook.Sheets["CargaMasiva"];
            var datos = xlsx.utils.sheet_to_json(worksheet);
            for (const element of datos) {
                element.project_process_state_id = 1;
                if (element.portfolio_id == null || element.portfolio_id == undefined) element.portfolio_id = req.user.settings.portfolio_id;
                await ProjectService.saveExcelV2(element).then(function (result) {
                    if (result) {
                        resultados.correctos.push(element.code);
                        return element.code;
                    }
                }, function (error) {
                    if (error) {
                        resultados.incorrectos.push(element.code);
                        
                        return element.code;
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
                message: "Se han cargado los proyectos",
                correctos: resultados.correctos,
                incorrectos:resultados.incorrectos
            })
        } catch (error) {
    
            console.log(error);
            return res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }
}

exports.getProyectsbyStatus = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.getProyectByStatusV1(req).then(function (result) {
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
        ProjectService.getProyectByStatusV2(req).then(function (result) {
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

exports.DenegarState = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.RechazarV1(req).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' denied succesfully',
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
        ProjectService.RechazarV2(req).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' denied succesfully',
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

exports.AprobarState = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.AprobarV1(req).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' accepted succesfully',
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
        ProjectService.AprobarV2(req).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' accepted succesfully',
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

exports.AprobarcComsState = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.AprobarComentariosV1(req, req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' accepted succesfully',
                    comentarios: req.body,
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
        ProjectService.AprobarComentariosV2(req, req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' accepted succesfully',
                    comentarios: req.body,
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

exports.saveArch = function (req, res)  {
    var direccion = req.user.settings.back_url
    if(req.baseUrl==URLBASE_MYSQLCONN){
        try{
            if(req.file == undefined){
                return res.status(400).send("Please upload a file!");
            }
            let path =
            direccion + "/recursos/archivos/" + req.file.filename;
            
            ProjectService.saveArchivoV1(req,path).then(function (result) {
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
        } catch (error) {
    
            console.log(error);
            return res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        try{
            if(req.file == undefined){
                return res.status(400).send("Please upload a file!");
            }
            let path =
            direccion + "/recursos/archivos/" + req.file.filename;
            
            ProjectService.saveArchivoV2(req,path).then(function (result) {
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
        } catch (error) {
    
            console.log(error);
            return res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }
}

exports.actualizarState = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.updateStateV1(req).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' state updated succesfully',
                    idStatus: req.params.idState
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
        ProjectService.updateStateV2(req).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Project with code ' + req.params.idProject + ' state updated succesfully',
                    idStatus: req.params.idState
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

exports.updateProject = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.updateProjectV1(req.body).then(function (result) {
            let errors = [];
            let success = [];
            if (result) {
                const data = result.map(r => {
                    if (r.error) {
                        errors.push(r.codigo)
                        return ""
                    }
                    else {
                        success.push(r.codigo)
                        return ""
                    }
                })
                return res.status(200).send({
                    success,
                    errors
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
        ProjectService.updateProjectV2(req.body).then(function (result) {
            let errors = [];
            let success = [];
            if (result) {
                const data = result.map(r => {
                    if (r.error) {
                        errors.push(r.codigo)
                        return ""
                    }
                    else {
                        success.push(r.codigo)
                        return ""
                    }
                })
                return res.status(200).send({
                    success,
                    errors
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


exports.sendUpdateRequest = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.sendUpdateRequestV1(req.body, req.user).then(function (result) {
            if (result) {
    
                return res.status(200).send({
                    error: result.error,
                    message: result.message
                })
            }
            else {
                return res.status(401).send({
                    error: result.error,
                    message: result.message
                })
            }
        })
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        ProjectService.sendUpdateRequestV2(req.body, req.user).then(function (result) {
            if (result) {
    
                return res.status(200).send({
                    error: result.error,
                    message: result.message
                })
            }
            else {
                return res.status(401).send({
                    error: result.error,
                    message: result.message
                })
            }
        })
    }
}

exports.getProyectsbyStatusVarious = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.getProyectByStatusVariousV1(req).then(function (result) {
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
        ProjectService.getProyectByStatusVariousV2(req).then(function (result) {
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

exports.handleUpdate = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.handleUpdateV1(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    error: result.error,
                    message: result.message
                })
            }
            else {
                return res.status(401).send({
                    error: result.error,
                    message: result.message
                })
            }
        })
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        ProjectService.handleUpdateV2(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    error: result.error,
                    message: result.message
                })
            }
            else {
                return res.status(401).send({
                    error: result.error,
                    message: result.message
                })
            }
        })
    }
}

exports.getMyEditRequest = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.getMyEditRequestV1(req.user.token.information.id).then(function (result) {
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
        ProjectService.getMyEditRequestV2(req.user.token.information.id).then(function (result) {
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

exports.mutipleUpdates = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.mutipleUpdatesV1(req.body).then(function (result) {
            let errors = []
            let success = []
            if (result) {
                const data = result.map(r => {
                    if (r.error) {
                        errors.push(r.codigo)
                        return ""
                    }
                    else {
                        success.push(r.codigo)
                        return ""
                    }
                })
                return res.status(200).send({
                    success,
                    errors
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
        ProjectService.mutipleUpdatesV2(req.body).then(function (result) {
            let errors = []
            let success = []
            if (result) {
                const data = result.map(r => {
                    if (r.error) {
                        errors.push(r.codigo)
                        return ""
                    }
                    else {
                        success.push(r.codigo)
                        return ""
                    }
                })
                return res.status(200).send({
                    success,
                    errors
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

exports.getEditsRequest = function (req, res) {
    //console.log(req.user.settings);
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.getEditRequestV1().then(function (result) {
        
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
        ProjectService.getEditRequestV2().then(function (result) {
        
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

exports.saveWithArchive = function (req, res) {
    var direccion = req.user.settings.back_url
    if(req.baseUrl==URLBASE_MYSQLCONN){
        try{
            if(req.file == undefined){
                return res.status(400).send("Please upload a file!");
            }
            let path =
            direccion + "/recursos/archivos/" + req.file.filename;
            
            ProjectService.saveWithArchiveV1(req.body,path).then(function (result) {
                if (result) {
                    return res.status(200).send({
                        data: result,
                        confirmacion: 'Project with id ' + result.id + ' created successfully',
                        idPosition: result.id,
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
                return res.status(400).send("Please upload a file!");
            }
            let path =
            direccion + "/recursos/archivos/" + req.file.filename;
            
            ProjectService.saveWithArchiveV2(req.body,path).then(function (result) {
                if (result) {
                    return res.status(200).send({
                        data: result,
                        confirmacion: 'Project with id ' + result.id + ' created successfully',
                        idPosition: result.id,
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

exports.getHistory = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.getHistoryV1(req.body).then(function (result) {
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
        ProjectService.getHistoryV2(req.body).then(function (result) {
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

exports.saveTeachers = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.saveTeachersV1(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Se han asignado los docentes al proyecto ' + req.params.idProject + ' de manera correcta',
                    idStatus: req.params.idState
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
        ProjectService.saveTeachersV2(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    message: 'Se han asignado los docentes al proyecto ' + req.params.idProject + ' de manera correcta',
                    idStatus: req.params.idState
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

exports.downloadProjects = function (req, res) {
    ProjectService.downloadProjects(req.body).then(function (result) {
        if (result) {
            const filename = path.join(__dirname, '../reports/report.xlsx');
            res.download(filename, 'report.xlsx', function (err) {
                if (err) {
                }
                fs.unlink(filename, function () {
                })
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

exports.listBySemester = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        ProjectService.listBySemesterV1(req.body).then(function (result) {
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
        ProjectService.listBySemesterV2(req.body).then(function (result) {
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