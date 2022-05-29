const { mysqlConnection } = require('../connections/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { security, requestAccess } = require('../constants');
const { Op } = require("sequelize");

const { hsAccessModel, hsSessionModel, userModel, registrationPermissionsModel, userRolModel } = require('../models');

exports.getUserByCode = function (code) {
    return new Promise(function (resolve, reject) {
        userModel.findOne({where:{code:code}}).then(usuario=>{
            resolve(usuario)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}
/*
exports.getUserByCode = function (code) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT * from user where code = ?',
        }, [code], function (error, result, fields) {
            if (result && result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}*/

exports.login = function (code) {
    return new Promise(function (resolve, reject) {
        userModel.findOne({include:{all: true, nested: true},where:{code:code}}).then(usuario=>{
            let user = {
                id: usuario[0].user_id,
                code: usuario[0].code,
                lastname: usuario[0].lastname,
                firstname: usuario[0].firstname,
                weighted_average: usuario[0].weighted_average,
                password: usuario[0].password,
                active: usuario[0].active
            };
            let roles = usuario.map((i) => { return { id: i.role_id, name: i.role_name, access: i.role_access.split(',') } });
            resolve({
                information: user,
                roles
            });
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}

/*
exports.login = function (code) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT ur.user_id, u.code, u.firstname, u.lastname, u.weighted_average, u.password, u.active, ur.role_id, r.name as role_name, r.access as role_access,
            app.portfolio_id, app.front_url, app.back_url
                        from application_settings as app, user_rol as ur
                        join role as r on r.id = ur.role_id 
                        join user as u on u.id = ur.user_id
                        where u.code = ?;`,
        }, [code], function (error, result, fields) {
            if (result && result.length > 0) {
                let user = {
                    id: result[0].user_id,
                    code: result[0].code,
                    lastname: result[0].lastname,
                    firstname: result[0].firstname,
                    weighted_average: result[0].weighted_average,
                    password: result[0].password,
                    active: result[0].active
                };
                let roles = result.map((i) => { return { id: i.role_id, name: i.role_name, access: i.role_access.split(',') } });
               
                resolve({
                    information: user,
                    roles
 
                });
            } else {
                resolve(null);
            }
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}
*/


exports.registerUser = function (user) {
    return new Promise(async function (resolve, reject) {
        if (user.code && user.password && user.firstname && user.lastname && user.role_id && user.semester_id) {
            registrationPermissionsModel.findOne({
                where:{
                    code:user.code,
                    semester_id:user.semester_id,
                    enabled:1
                }
            }).then(UserRegistration=>{
                const User=await userModel.findOne({where:{code:user.code}})
                if(User===null||User===undefined){
                    userModel.create({
                        code:user.code,
                        password:createHash(user.password),
                        firstname:user.firstname,
                        lastname:user.lastname
                    }).then(NewUser=>{
                        const uid=NewUser.id
                        userRolModel.create({
                            user_id:uid,
                            role_id:user.role_id
                        }).then(result=>{
                            resolve(uid)
                        }).catch(error=>{
                            reject({
                                codeMessage: error.code ? error.code : 'ER_',
                                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                            })
                        })
                    }).catch(error=>{
                        reject({
                            codeMessage: error.code ? error.code : 'ER_',
                            message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                        })
                    })
                }else{
                    reject({
                        codeMessage: 'ERR_USER_ALREADY_EXISTS',
                        message: 'El usuario con el código ' + user.code + ' ya existe en el sistema.'
                    })
                }
            }).catch(error=>{
                reject({
                    codeMessage: 'WRONG CODE',
                    message: 'The code sended wasnt in the list'
                })
            })
        } else {
            reject({
                codeMessage: 'ERR_USER_NO_ALLOWED',
                message: 'El usuario con el código ' + user.code + ' No tiene permisos de para usar el aplicativo'
            })
        }
    })

}

//cambios a role y sacar career y cambios al query
/*exports.registerUser = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code && user.password && user.firstname && user.lastname && user.role_id && user.semester_id) {
            mysqlConnection.query({
                sql: `SELECT * from registration_permissions where code = "${user.code}" and semester_id = ${user.semester_id} and enabled = 1`,
            }, function (error, result, fields) {
                if (result && result.length > 0) {
                    mysqlConnection.query({
                        sql: 'SELECT * from user where code = ?',
                    }, [user.code], function (error, result, fields) {
                        if (result && result.length > 0) {
                            reject({
                                codeMessage: 'ERR_USER_ALREADY_EXISTS',
                                message: 'El usuario con el código ' + user.code + ' ya existe en el sistema.'
                            })
                        } else {
                            mysqlConnection.query({
                                sql: 'INSERT INTO user (`code`, `password`, `firstname`, `lastname`) VALUES (?,?,?,?)',
                            }, [user.code, createHash(user.password), user.firstname, user.lastname], function (error, r, fields) {
                                if (r) {
                                    const uid = r.insertId
                                    mysqlConnection.query({
                                        sql: 'INSERT INTO user_rol (`user_id`, `role_id`) VALUES (?,?)',
                                    }, [uid, user.role_id], function (error, result, fields) {
                                        if (result) {
                                            resolve(uid)
                                        }
                                        if (error) {
                                            reject({
                                                codeMessage: error.code ? error.code : 'ER_',
                                                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                                            })
                                        }
                                    })
                                }
                                if (error) {
                                    reject({
                                        codeMessage: error.code ? error.code : 'ER_',
                                        message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                                    })
                                }
                            })
                        }
                        if (error) {
                            reject({
                                codeMessage: error.code ? error.code : 'ER_',
                                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                            })
                        }
                    })
                } else {
                    reject({

                        codeMessage: 'WRONG CODE',
                        message: 'The code sended wasnt in the list'
                    })
                }
            })
        } else {
            reject({
                codeMessage: 'ERR_USER_NO_ALLOWED',
                message: 'El usuario con el código ' + user.code + ' No tiene permisos de para usar el aplicativo'
            })
        }
    })

}*/

exports.changePassword = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code && user.password && user.newPassword) {
            userModel.findOne({where:{code:user.code}}).then(usuario=>{
                var newPassword = user.newPassword;
                var oldPassword = user.password;
                if (newPassword == oldPassword) {
                    reject({
                        codeMessage: 'ER_SAME_PASSWORD',
                        message: "Las contraseñas son iguales"
                    })
                }
                console.log(usuario[0].password);
                const isValid = bcrypt.compareSync(oldPassword, usuario[0].password);
                console.log(isValid);
                if (!isValid) {
                    reject({
                        codeMessage: 'ER_PASSWORD_INCORRECT',
                        message: "Contraseña no coincide"
                    })
                } else {
                    userModel.update({
                        password:createHash(newPassword)
                    },{
                        where:{code:user.code}
                    }).then(UsuarioCambiado=>{
                        resolve(UsuarioCambiado)
                    }).catch(error=>{
                        reject({
                            codeMessage: error.code ? error.code : 'ER_',
                            message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                        })
                    })
                }
            }).catch(error=>{
                reject({
                    codeMessage: 'ERR_USER_NOT_FOUND',
                    message: 'El usuario con el código ' + user.code + ' no existe en el sistema.'
                })
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for register'
            })
        }
    })
}
/*
exports.changePassword = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code && user.password && user.newPassword) {
            mysqlConnection.query({
                sql: 'SELECT * from user where code = ?',
            }, [user.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    var newPassword = user.newPassword;
                    var oldPassword = user.password;
                    if (newPassword == oldPassword) {
                        reject({
                            codeMessage: 'ER_SAME_PASSWORD',
                            message: "Las contraseñas son iguales"
                        })
                    }
                    console.log(result[0].password);
                    const isValid = bcrypt.compareSync(oldPassword, result[0].password);
                    console.log(isValid);
                    if (!isValid) {
                        reject({
                            codeMessage: 'ER_PASSWORD_INCORRECT',
                            message: "Contraseña no coincide"
                        })
                    } else {
                        mysqlConnection.query({
                            sql: 'UPDATE user SET password=? WHERE code = ?',
                        }, [createHash(newPassword), user.code], function (error, result, fields) {
                            if (result) {
                                resolve(result);
                            }
                            if (error) {
                                reject({
                                    codeMessage: error.code ? error.code : 'ER_',
                                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                                })
                            }
                        })
                    }
                } else {
                    reject({
                        codeMessage: 'ERR_USER_NOT_FOUND',
                        message: 'El usuario con el código ' + user.code + ' no existe en el sistema.'
                    })
                }
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for register'
            })
        }
    })
}
*/

var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

exports.recPass = function (code) {
    return new Promise(function (resolve, reject) {
        userModel.findOne({where:{code:code.code}}).then(Usuario=>{
            const code = Usuario[0].code
            const pass = makepass();
            const cryptedpass = createHash(pass);
            userModel.update({
                password:cryptedpass,
            },{
                where:{code:code}
            }).then(Result=>{
                resolve(pass)
            }).catch(error=>{
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            })
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}
/*
exports.recPass = function (code) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT code from user where code = ?`,
        }, [code.code], function (error, result, fields) {
            if (result) {
                const code = result[0].code
                const pass = makepass();
                const cryptedpass = createHash(pass);
                mysqlConnection.query({
                    sql: 'UPDATE user u SET u.password = ? WHERE u.code = ?',
                }, [cryptedpass, code], function (error, result, fields) {
                    if (result) {
                        resolve(pass)
                    }
                    if (error) {
                        reject({
                            codeMessage: error.code ? error.code : 'ER_',
                            message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                        })
                    }
                })
            } else {
                resolve("Error");
            }
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}*/

exports.createSession = function (payload) {
    return new Promise(function (resolve, reject) {
        const user_id = payload.information.id
        const token = jwt.sign(payload, security.JWT_SECRET);
        hsSessionModel.create({
            token:token,
            user_id:user_id
        }).then(NewSession=>{
            resolve({
                token,
                user: payload
            });
        }).catch(error=>{
            console.log(error);
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}

/*
exports.createSession = function (payload) {
    return new Promise(function (resolve, reject) {
        const user_id = payload.information.id
        const token = jwt.sign(payload, security.JWT_SECRET);
        mysqlConnection.query({
            sql: 'INSERT INTO hs_session (`token`, `user_id`) VALUES (?,?)',
        }, [token, user_id], function (error, result, fields) {
            if (result) {
                resolve({
                    token,
                    user: payload
                });
            } else {
                resolve(null);
            }
            if (error) {
                console.log(error);
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}*/

exports.closeSession = function (body) {
    return new Promise(function (resolve, reject) {
        hsSessionModel.destroy({
            where:{
                token:body.token,
                user_id:body.user_id
            }
        }).then(result=>{
            resolve(result)
        }).catch(error=>{
            console.log(error);
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
        
    })
}
/*
exports.closeSession = function (body) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'DELETE FROM hs_session WHERE token = ? and user_id = ?',
        }, [body.token, body.user_id], function (error, result, fields) {
            if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
            if (error) {
                console.log(error);
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}*/

exports.checkValidToken = function (token) {
    return new Promise(function (resolve, reject) {
        hsSessionModel.findOne({ where: { token: token }}).then(session=>{
            resolve(JSON.stringify(session));
        }).catch(error=>{
            reject(error);
        })
    })
}
/*
exports.checkValidToken = function (token) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'SELECT * from hs_session where token = ?',
        }, [token], function (error, result, fields) {
            if (result && result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}
*/
var makepass = function () {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

exports.requestAccess = function (code) {
    return new Promise(async function (resolve, reject) {
        const Usuario=await userModel.findOne({attributes:code,where:{code:code.code}});
        if (Usuario == []||Usuario!=null||Usuario!=undefined) {
            console.log(Usuario)
            reject(`El usuario ya existe, prueba recuperando tu contraseña`)
        } else {
            console.log("en else")
            userModel.findAll({
                where:{
                    '$user_rol.role_id$':{[Op.eq]:5},
                    id:'$user_rol.user_id$'
                },
                include:[{
                    model:userRolModel,
                    as:'user_rol'
                }],    
            }).then(resultado=>{
                const pmos = resultado
                pmos.map(pmo => {
                    const data = pmo
                    const mail = requestAccess(code.code, data.code, data.firstname, data.lastname);
                })
                resolve("Correo enviado correctamente")                
            }).catch(error=>{
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            })

        }

    })
}
/*
exports.requestAccess = function (code) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: `SELECT code from user where code = ?`,
        }, [code.code], function (error, result, fields) {
            if (result == []) {
                console.log(result)
                reject(`El usuario ya existe, prueba recuperando tu contraseña`)
            } else {
                console.log("en else")
                mysqlConnection.query({
                    sql: 'select* from user u, user_rol ur where ur.user_id = u.id and ur.role_id =5',
                }, [], function (error, result, fields) {
                    if (result) {
                        const pmos = result
                        pmos.map(pmo => {
                            const data = pmo
                            const mail = requestAccess(code.code, data.code, data.firstname, data.lastname);
                        })
                        resolve("Correo enviado correctamente")
                    }
                    if (error) {
                        reject({
                            codeMessage: error.code ? error.code : 'ER_',
                            message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                        })
                    }
                })

            }
            if (error) {
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                })
            }
        })
    })
}*/