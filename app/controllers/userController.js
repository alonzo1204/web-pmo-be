const { UserService } = require('../services');
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