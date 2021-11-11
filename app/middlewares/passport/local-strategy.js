var passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { AuthService } = require('../../services');

passport.serializeUser(function (user, done) {
    done(null, user.code);
});

passport.deserializeUser(function (code, done) {
    AuthService.getUserByCode(code).then((response) => {
        if (response) {
            done(null, response);
        }
    }).catch((error) => {
        if (error) {
            done(error, false);
        }
    });
});

passport.use('local', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'code',
    passwordField: 'password'
},
    function (req, username, password, done) {
        console.log({
            username,
            password
        })
        AuthService.getUserByCode(username).then((response) => {
            if (response) {
                console.log(response)
                if (!isValidPassword(response, password)) {
                    console.log('Invalid Password');
                    return done({ message: 'Contraseña de usuario incorrecta' }, false);
                }
                done(null, response);
            } else {
                console.log('User Not Found with username ' + username);
                return done({ message: 'Código de usuario incorrecto' }, false);
            }
        }).catch((error) => {
            if (error) {
                done(error, null);
            }
        });
    })
);

var isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
}