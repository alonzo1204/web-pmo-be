const { RoleService } = require('../services');

exports.getFullList = function (req, res) {
    RoleService.getFullList().then(function (result) {
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