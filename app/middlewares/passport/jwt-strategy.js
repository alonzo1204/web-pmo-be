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
        async (req, token, done) => { //TOKEN ES LA INFORMACION DENTRO DEL JWT
            const jwt = req.headers.authorization.split(' ')[1];
            /*
            var settings = await AppSettingsService.getConfiguration().then(function(result) {
                let settings = {
                    front_url: result[0].front_url,
                    back_url: result[0].back_url,
                    name_portfolio: result[0]['portfolio.name'],
                    portfolio_state: result[0]['portfolio_state.state'],
                    semester: result[0]['semester.name'],
                    date_from: result[0]['semester.date_from'],
                    date_until: result[0]['semester.date_until']
                };
                //console.log(result)
                return settings
            })*/
            var setts=await AppSettingsService.getConfigurationV2();
            let settings = {
                front_url: setts[0].dataValues.front_url,
                back_url: setts[0].dataValues.back_url,
                portfolio_id: setts[0].dataValues.portfolio.id,
                portfolio_name: setts[0].dataValues.portfolio.name,
                portfolio_state_id: setts[0].dataValues.portfolio.portfolio_state_id,
                portfolio_state: setts[0].dataValues.portfolio.portfolio_state.state,
                semester_id: setts[0].dataValues.portfolio.semester.id,
                semester_name: setts[0].dataValues.portfolio.semester.name,
                date_from: setts[0].dataValues.portfolio.semester.date_from,
                date_until: setts[0].dataValues.portfolio.semester.date_until,
            };
            try {
                AuthService.checkValidToken(jwt).then((response) => {
                    if (response) {
                        
                        //ENVIAR INFORMACION DE CONFIGURACION DEL SISTEMA
                        //console.log("settings");
                        return done(null, { token, settings });
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