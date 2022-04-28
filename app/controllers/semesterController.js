const { SemesterService } = require('../services');

exports.getFullList = function (req, res) {
    SemesterService.getFullList().then(function (result) {
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
exports.createSemester = function (req, res) {
    SemesterService.createSemester(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result,
                message: 'semester ' + result.insertId + ' created successfully',
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