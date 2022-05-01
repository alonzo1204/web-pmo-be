const { ProjectService } = require('../services');
var dot = require('dot-object');
const fs = require('fs');
var xlsx = require("xlsx");
const { EOL } = require('os');

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

exports.saveExcel =async function (req, res, callback) {
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
            if (element.portfolio_id == null || element.portfolio_id == undefined) element.portfolio_id = req.user.settings.portfolio_name;
            await ProjectService.saveExcel(element).then(function (result) {
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

exports.getProyectsbyStatus = function (req, res) {
    ProjectService.getProyectByStatus(req).then(function (result) {
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

exports.DenegarState = function (req, res) {
    ProjectService.Rechazar(req).then(function (result) {
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

exports.AprobarState = function (req, res) {
    ProjectService.Aprobar(req).then(function (result) {
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

exports.AprobarcComsState = function (req, res) {
    ProjectService.AprobarComentarios(req, req.body).then(function (result) {
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

exports.saveArch = function (req, res)  {
    var direccion = req.user.settings.back_url
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload a file!");
        }
        let path =
        direccion + "/recursos/archivos/" + req.file.filename;
        
        ProjectService.saveArchivo(req,path).then(function (result) {
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

exports.actualizarState = function (req, res) {
    ProjectService.updateState(req).then(function (result) {
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

exports.updateProject = function (req, res) {
    ProjectService.updateProject(req.body).then(function (result) {
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


exports.sendUpdateRequest = function (req, res) {
    ProjectService.sendUpdateRequest(req.body, req.user).then(function (result) {
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

exports.getProyectsbyStatusVarious = function (req, res) {
    ProjectService.getProyectByStatusVarious(req).then(function (result) {
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

exports.handleUpdate = function (req, res) {
    ProjectService.handleUpdate(req.body).then(function (result) {
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

exports.getMyEditRequest = function (req, res) {
    
    ProjectService.getMyEditRequest(req.user.token.information.id).then(function (result) {
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

exports.mutipleUpdates = function (req, res) {
    ProjectService.mutipleUpdates(req.body).then(function (result) {
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

exports.getEditsRequest = function (req, res) {
    //console.log(req.user.settings);
    ProjectService.getEditRequest().then(function (result) {
        
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

exports.saveWithArchive = function (req, res) {
    var direccion = req.user.settings.back_url
    try{
        if(req.file == undefined){
            return res.status(400).send("Please upload a file!");
        }
        let path =
        direccion + "/recursos/archivos/" + req.file.filename;
        
        ProjectService.saveWithArchive(req.body,path).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result,
                    confirmacion: 'Project with id ' + result.insertId + ' created successfully',
                    idPosition: result.insertId,
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

exports.downloadExcel =function (req, res, callback) {
    //console.log([req.body])
    const ws = xlsx.utils.json_to_sheet(req.body)
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, 'Proyectos')
    xlsx.writeFile(wb, __basedir+'/recursos/uploads/Proyectos.xlsx')

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    res.setHeader('Content-disposition', `attachment;filename=Proyectos.xlsx`);
    res.charset = 'UTF-8';
    return res.status(200).download(__basedir+'/recursos/uploads/Proyectos.xlsx') 
    fs.unlink(path, (err) => {
        if (err) {
            throw err;
        }
        console.log("File is deleted.");
    });
    return res.status(200).send({
        message: "Excel descargado"
    })
}
