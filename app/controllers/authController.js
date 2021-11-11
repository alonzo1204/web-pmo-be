const { AuthService } = require('../services');
const passport = require('passport');

exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return res.status(400).send(err)
        } else if (!user) {
            return res.status(400).send({ error: 'Error' })
        } else {
            return res.send({ data: user })
        }
    })(req, res, next);
}

exports.register = function (req, res) {
    AuthService.registerUser(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result,
                message: 'User with id ' + result.insertId + ' created successfully',
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
