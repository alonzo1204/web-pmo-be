const { AuthService } = require('../services');
const { sendMail } = require('../constants')
const { endpoints } = require('../constants');

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
                message: 'User with id ' + result + ' created successfully',
                idPosition: result
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

exports.logout = function (req, res) {
    AuthService.closeSession(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                message: 'La sesión fue cerrada con éxito'
            })
        } else {
            return res.status(400).send({
                message: 'La sesión no existe'
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

exports.recoverPass = function (req, res) {
    AuthService.recPass(req.body).then(function (result) {
        if (result) {
            sendMail(result, req.body.code).then(() => (res.status(200).send({
                message: "Correo enviado con exito"
            })))
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

exports.changePassword = function (req, res, next) {

    AuthService.changePassword(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result,
                message: 'User with id ' + req.body.code + ' password changed successfully',
                code: req.body.code
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

exports.requestAccess = function (req, res, next) {

    AuthService.requestAccess(req.body).then(function (result) {
        if (result) {
            return res.status(200).send({
                data: result,
                message: 'Mensaje enviado correctamente',
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