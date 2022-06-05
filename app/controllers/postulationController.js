const { PostulationService } = require('../services');
var dot = require('dot-object');
const { endpoints } = require('../constants');

const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN

exports.getFullList = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        PostulationService.getFullListV1().then(function (result) {
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
        PostulationService.getFullListV2().then(function (result) {
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
        PostulationService.saveV1(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result.data,
                    message: 'Postulation with id ' + result.id + ' created successfully',
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
        PostulationService.saveV2(req.body).then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result.data,
                    message: 'Postulation with id ' + result.id + ' created successfully',
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

exports.myPostulation = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        PostulationService.myPostulationV1(req.user.token.information).then(function (result) {
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
        PostulationService.myPostulationV2(req.user.token.information).then(function (result) {
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


exports.setProyects = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        PostulationService.setProyectsV1().then(function (result) {
            if (result) {
                return res.status(200).send({
                    result
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send({
                    error
                })
            }
        })
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        PostulationService.setProyectsV2().then(function (result) {
            if (result) {
                return res.status(200).send({
                    result
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send({
                    error
                })
            }
        })
    }
}

exports.getHistory = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        PostulationService.getHistoryV1(req.body).then(function (result) {
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
        PostulationService.getHistoryV2(req.body).then(function (result) {
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

exports.getpostulations = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        PostulationService.getpostulationsV1(req).then(function (result) {
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
        PostulationService.getpostulationsV2(req).then(function (result) {
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

exports.asignarProyectos = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        PostulationService.asignarProyectosV1().then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send(error)
            }
        })
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        PostulationService.asignarProyectosV2().then(function (result) {
            if (result) {
                return res.status(200).send({
                    data: result
                })
            }
        }, function (error) {
            if (error) {
                return res.status(401).send(error)
            }
        })
    }
}
