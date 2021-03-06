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
    const settings = req.user.settings;
    ProjectService.save(req.body, settings).then(function (result) {

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

exports.saveExcel = function (req, res, callback) {
    global.nCorrectos = 0;
    global.Incorrectos = [];
    try {
        if (req.file == undefined) {
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
            if (element.project_process_state_id == null) element.project_process_state_id = 6;
            ProjectService.saveExcel(element).then(function (result) {
                if (result) {
                    nCorrectos += 1;
                    //send no funciona por alguna razon
                    //res.status(200).status({
                    //    data: result,
                    //    message: 'Project with id ' + result.insertId + ' created successfully',
                    //    idPosition: result.insertId
                    //})
                    //return;
                }
            }, function (error) {
                if (error) {
                    console.log(element.code);
                    //send no funciona por alguna razon
                    //return res.status(401).send({
                    //    code: error.codeMessage,
                    //    message: error.message,
                    //});
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

exports.saveArch = function (req, res) {
    var direccion = req.user.settings.back_url
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a file!");
        }
        let path =
            direccion + "/recursos/archivos/" + req.file.filename;

        ProjectService.saveArchivo(req, path).then(function (result) {
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
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a file!");
        }
        let path =
            direccion + "/recursos/archivos/" + req.file.filename;

        ProjectService.saveWithArchive(req.body, path).then(function (result) {
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
    } catch (error) {

        console.log(error);
        return res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}

exports.getHistory = function (req, res) {
    ProjectService.getHistory(req.body).then(function (result) {
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