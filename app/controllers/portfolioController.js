const { portfolioService } = require('../services')
var dot = require('dot-object');

exports.getFullList = function (req, res) {
    portfolioService.getAll().then(function (result) {
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

exports.savePortfolio = function (req, res) {
    
    portfolioService.savePortfolio(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result.data,
                message: 'Portfolio with id ' + result.id + ' created successfully',
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