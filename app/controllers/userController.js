const { UserService, AuthService } = require('../services');
var dot = require('dot-object');

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
                message: 'Project with code ' + req.params.idUser + ' state updated succesfully',
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

