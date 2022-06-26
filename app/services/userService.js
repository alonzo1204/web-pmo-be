const { mysqlConnection, sequelize } = require('../connections');
const { userModel, registrationPermissionsModel, userRolModel } = require('../models/index');


//get list users
exports.getFullListV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `select 
                u.id,
                u.code, 
                u.firstname, 
                u.lastname, 
                u.active, 
                u.weighted_average, 
                r.id as 'role.id', 
                r.name as 'role.name'
                from user u, user_rol ur, role r 
                where u.id = ur.user_id and
                r.id = ur.role_id
                group by u.id`,
        }, function (error, result, fields) {
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
    })
}

exports.getFullListV2 =function(){
    return new Promise(function(resolve,reject){
        userModel.findAll({include:{all: true, nested: true}}).then(careers=>{
            resolve(careers);
        }).catch(error=>{
            reject(error);
        })
    })
};

//lista de profesores
exports.getFullListTeachersV1 = function () {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql:
                `select 
                u.id,
                u.code, 
                u.firstname, 
                u.lastname,
                CONCAT(u.code,' - ',u.firstname,' ',u.lastname) as fullInformation,
                u.active, 
                u.weighted_average,
                c.id as 'carrera.codigo de la carrera',
                c.name as 'carrera.nombre de la carrera'
                from user u
                left join user_rol ur on ur.user_id = u.id
                left join role r on r.id = ur.role_id
                left join career c on c.id = u.career_id
                where ur.role_id in (4,5)
                group by u.id`,
        }, function (error, result, fields) {
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
    })
}

exports.getFullListTeachersV2 = function () {
    return new Promise( function (resolve, reject) {
        sequelize.query(
            `select 
                u.id,
                u.code, 
                u.firstname, 
                u.lastname,
                CONCAT(u.code,' - ',u.firstname,' ',u.lastname) as fullInformation,
                u.active, 
                u.weighted_average,
                c.id as 'carrera.codigo de la carrera',
                c.name as 'carrera.nombre de la carrera'
                from user u
                left join user_rol ur on ur.user_id = u.id
                left join role r on r.id = ur.role_id
                left join career c on c.id = u.career_id
                where ur.role_id in (4,5)
                group by u.id`
        ).then(result=>{
            resolve(result)
        }).catch(error=>{
            reject({
                codeMessage: error.code ? error.code : 'ER_',
                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
            })
        })
    })
}


//dar de baja a usuario
exports.BajaV1 = function (usuario) {
    var code = usuario.params.idUser;
    return new Promise(function (resolve, reject) {
        mysqlConnection.query({
            sql: 'UPDATE user u SET u.active = 0 WHERE u.code = ?',
        }, [code], function (error, result, fields) {
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
    })
}

exports.BajaV2 = function (usuario) {
    var code = usuario.params.idUser;
    return new Promise(function (resolve, reject) {
        userModel.update({active:0},{where:{code:code}}).then(function(){
            userModel.findOne({where:{code:code}}).then(user=>{
                resolve(user)
            })
        }).catch(error=>{
            reject(error)
        })
    })
}

//Carga masica ingles
exports.CargaMasivaInglesV1 = function (user) {
    console.log(user)
    return new Promise(function (resolve, reject) {
        if (user.code) {
            mysqlConnection.query({
                sql: 'SELECT id, code from user where code = ?',
            }, [user.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    mysqlConnection.query({
                        sql: `update user set english = ${user.english} where code = '${user.code}'`,
                    }, function (error, result, fields) {
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

                } else {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
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
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}

exports.CargaMasivaInglesV2 = function (user) {
    console.log(user)
    return new Promise(function (resolve, reject) {
        if (user.code) {
            userModel.findOne({where:{code:user.code}}).then(function(result){
                if (result!=null||result!=undefined) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                }else{
                    userModel.update({
                        english:user.english
                    },{
                        where:{
                            code:user.code
                        }
                    }).then(function(){
                        userModel.findOne({where:{code:user.code}}).then(usuario=>{
                            resolve({usuario})
                        }).catch(error=>{
                            reject(error)
                        })
                        
                    }).catch(error=>{
                        reject({
                                codeMessage: error.code ? error.code : 'ER_',
                                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                            })
                    })
                }
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}

//CArga de promedios masivo
exports.CargaMasivaPromedioV1 = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code) {
            mysqlConnection.query({
                sql: 'SELECT id, code from user where code = ?',
            }, [user.code], function (error, result, fields) {
                if (result && result.length > 0) {
                    mysqlConnection.query({
                        sql: `update user set weighted_average = ${user.weighted_average} where code = '${user.code}'`,
                    }, function (error, result, fields) {
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

                } else {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
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
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}

exports.CargaMasivaPromedioV2 = function (user) {
    return new Promise(function (resolve, reject) {
        if (user.code) {
            userModel.findOne({where:{code:user.code}}).then(function(result){
                if (result!=null||result!=undefined) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                }else{
                    userModel.update({
                        weighted_average:user.weighted_average
                    },{
                        where:{
                            code:user.code
                        }
                    }).then(function(){
                        userModel.findOne({where:{code:user.code}}).then(usuario=>{
                            resolve({usuario})
                        }).catch(error=>{
                            reject(error)
                        })
                        
                    }).catch(error=>{
                        reject({
                                codeMessage: error.code ? error.code : 'ER_',
                                message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                            })
                    })
                }
            })
        } else {
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}


// Para el register_permission
exports.CargaMasivaPermisosV1 = function(user){
    return new Promise(function (resolve, reject) {
        if(user.code && user.semester_id){
            mysqlConnection.query({
                sql: 'SELECT id, code from registration_permissions where code = ?',
            }, [user.code], function (error, result, fields){
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO registration_permissions (`code`, `enabled`, `semester_id`) VALUES (?,1,?)',
                    },[user.code,user.semester_id], function (error, result, fields){
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
                if (error) {
                    
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                    })
                }
            })
        }else{
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}

exports.CargaMasivaPermisosV2 = function(user){
    return new Promise(function (resolve, reject) {
        registrationPermissionsModel.findOne({where:{code:user.code}}).then(function(){
            if (result!=null||result!=undefined) {
                reject({
                    codeMessage: 'USER_EXIST',
                    message: `The user with id ${user.id} are already in a postulation`
                })
            }else{
                registrationPermissionsModel.create({values:{
                    code:user.code,
                    enabled:1,
                    semester_id:user.semester_id
                }
                }).then(NewUser=>{
                    resolve({data:NewUser,id:NewUser.id})
                }).catch(error=>{
                    reject(error)
                })
            }
        })
        userModel.create(user).then(newUser=>{
            resolve(newUser)
        }).catch(error=>{
            reject(error)
        })
    })
}

// Para el register_permission
exports.CargaMasivaPermisosBloqueadosV1 = function(user){
    return new Promise(function (resolve, reject) {
        if(user.code && user.semester_id){
            mysqlConnection.query({
                sql: 'SELECT id, code from registration_permissions where code = ?',
            }, [user.code], function (error, result, fields){
                if (result && result.length > 0) {
                    reject({
                        codeMessage: 'CODE_DUPLICATED',
                        message: 'Send an unique code for user'
                    })
                } else {
                    mysqlConnection.query({
                        sql: 'INSERT INTO registration_permissions (`code`, `enabled`, `semester_id`) VALUES (?,0,?)',
                    },[user.code,user.semester_id], function (error, result, fields){
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
                if (error) {
                    
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                    })
                }
            })
        }else{
            reject({
                codeMessage: 'MISSING_INFORMATION',
                message: 'Send the complete body for registration'
            })
        }
    })
}

exports.CargaMasivaPermisosBloqueadosV2 = function(user){
    return new Promise(function (resolve, reject) {
        registrationPermissionsModel.findOne({where:{code:user.code}}).then(function(){
            if (result!=null||result!=undefined) {
                reject({
                    codeMessage: 'USER_EXIST',
                    message: `The user with id ${user.id} are already in a postulation`
                })
            }else{
                registrationPermissionsModel.create({values:{
                    code:user.code,
                    enabled:0,
                    semester_id:user.semester_id
                }
                }).then(NewUser=>{
                    resolve({data:NewUser,id:NewUser.id})
                }).catch(error=>{
                    reject(error)
                })
            }
        })
        userModel.create(user).then(newUser=>{
            resolve(newUser)
        }).catch(error=>{
            reject(error)
        })
    })
}


//Change name
exports.changeNameV1 = function (data) {
    return new Promise(function (resolve, reject) {
        if (data.id) {
            mysqlConnection.query({
                sql: `Select * from user where id = ${data.id} `
            }, function (error, result, fields) {
                if (result) {
                    if (data.firstname && data.lastname, data.career_id) {
                        mysqlConnection.query({
                            sql: `Update user set firstname = '${data.firstname}' , lastname = '${data.lastname}', career_id = ${data.career_id} where id = ${data.id}`,
                        }, function (error, result, fields) {
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
                    else {
                        reject({
                            codeMessage: error.code ? error.code : 'ER_',
                            message: 'Error, mandar datos completos'
                        })
                    }
                }
                else {
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: 'Id incorrecto'
                    })
                }
            })
        }
    })
}

exports.changeNameV2 = function (data) {
    return new Promise(function (resolve, reject) {
        if (data.id) {
            userModel.findByPk({id:data.id}).then(function(){
                if (data.firstname && data.lastname, data.career_id) {
                    userModel.update({
                        firstname:data.firstname,
                        lastname:data.lastname,
                        career_id:data.career_id
                    },{where:{
                        id:data.id
                    }
                }).then(function(){
                    userModel.findByPk({id:data.id}).then(usuario=>{
                        resolve({
                            usuario
                        })
                    })
                }).catch(error=>{
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: error.sqlMessage ? error.sqlMessage : 'Connection Failed'
                    })
                })
                }
                else {
                    reject({
                        codeMessage: error.code ? error.code : 'ER_',
                        message: 'Error, mandar datos completos'
                    })
                }
            }).catch(error=>{
                reject({
                    codeMessage: error.code ? error.code : 'ER_',
                    message: 'Id incorrecto'
                })
            })
        }
    })
}
