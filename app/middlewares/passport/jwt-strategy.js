var passport = require('passport');
const { security } = require('../../constants');
const { AuthService } = require('../../services');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'jwt',
    new JWTstrategy(
        {
            secretOrKey: security.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true
        },
        async (req, token, done) => {
            const jwt = req.headers.authorization.split(' ')[1];
            try {
                AuthService.checkValidToken(jwt).then((response) => {
                    if (response) {
                        return done(null, token);
                    } else {
                        return done({ message: 'El token enviado no es válido' }, false);
                    }
                }).catch((e) => {
                    done(e, null);
                })
            } catch (error) {
                done(error);
            }
        }
    )
);