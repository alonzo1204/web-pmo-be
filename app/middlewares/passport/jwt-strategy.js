var passport = require('passport');
const { security } = require('../../constants');
const { AuthService, AppSettingsService } = require('../../services');

const { mysqlConnection } = require('../../connections/mysql');

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
        async (req, token, next) => { //TOKEN ES LA INFORMACION DENTRO DEL JWT
            const jwt = req.headers.authorization.split(' ')[1];
            var settings = await AppSettingsService.getConfiguration('1').then(function (result) {
                let settings = {
                    front_url: result[0].front_url,
                    back_url: result[0].back_url,
                    name_portfolio: result[0]['portfolio.name'],
                    portfolio_state: result[0]['portfolio_state.state'],
                    portfolio_id: result[0]['portfolio.id'],
                    semester_id: result[0]['semester.id'],
                    semester: result[0]['semester.name'],
                    date_from: result[0]['semester.date_from'],
                    date_until: result[0]['semester.date_until']
                };
                //console.log(result)
                return settings
            })

            try {
                AuthService.checkValidToken(jwt).then((response) => {
                    if (response) {
                        //ENVIAR INFORMACION DE CONFIGURACION DEL SISTEMA
                        return next(null, { token, settings });
                    } else {
                        return next('El token enviado no es válido');
                    }
                }).catch((e) => {
                    next(e);
                })
            } catch (error) {
                next(error);
            }
        }
    )
);