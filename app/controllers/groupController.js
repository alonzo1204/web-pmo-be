const { groupService } = require('../services');

exports.save = function (req, res) {
    groupService.save(req.body).then(function (result) {

        if (result) {
            return res.status(200).send({
                data: result,
                message: 'group created successfully',
                idPosition: result.groupid
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