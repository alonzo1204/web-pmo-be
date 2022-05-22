const { PostulationService } = require('../services');
var dot = require('dot-object');

exports.getFullList = function (req, res) {
    PostulationService.getFullList().then(function (result) {
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
    PostulationService.save(req.body).then(function (result) {
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