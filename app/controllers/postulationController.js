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
                data: result,
                message: 'Postulation with id ' + result.insertId + ' created successfully',
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

exports.myPostulation = function (req, res) {
    PostulationService.myPostulation(req.user.token.information).then(function (result) {
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

exports.setProyects = function (req, res) {
    PostulationService.setProyects().then(function (result) {
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

exports.getHistory = function (req, res) {
    PostulationService.getHistory(req.body).then(function (result) {
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

exports.getpostulations = function (req, res) {
    PostulationService.getpostulations(req).then(function (result) {
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