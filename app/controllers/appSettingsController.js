const { AppSettingsService } = require('../services');

exports.getConfig = function (req, res) {
    AppSettingsService.getConfiguration(req.params.idConfig).then(function (result) {
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

exports.editConfig = function (req, res) {
    AppSettingsService.editConfiguration(req).then(function (result) {
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
