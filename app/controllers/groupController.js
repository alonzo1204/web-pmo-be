const { groupService } = require('../services');

exports.save = function (req, res) {
    groupService.save(req.body).then(function (result) {

        if (result) {
            return res.status(200).send({
                data: result,
                message: 'group' + result.insertId + ' created successfully',
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

exports.getgroup = function (req, res) {
    groupService.getgroup(req.body).then(function (result) {

        if (result) {
            return res.status(200).send({
                data: result,
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