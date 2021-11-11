const { ClientsService } = require('../services');

exports.getClients = function (req, res) {
    ClientsService.getClients().then(function (result) {
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

exports.getClientsById = function (req, res) {
    ClientsService.getClients(req.params.idClients).then(function (result) {
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

exports.saveClient = function (req, res) {
    ClientsService.saveClient(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result,
                message: 'Client with id ' + result.insertId + ' created successfully',
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