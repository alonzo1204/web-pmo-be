const { userModel, registrationPermissionsModel } = require('../models');


exports.getFullList =function(){
    return new Promise(function(resolve,reject){
        userModel.findAll({include:{all: true, nested: true}}).then(careers=>{
            resolve(careers);
        }).catch(error=>{
            reject(error);
        })
    })
};


/*
exports.getFullList = function () {
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
*/

exports.Baja = function (usuario) {
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

/*
exports.Baja = function (usuario) {
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
}*/

exports.CargaMasivaPermisos = function(user){
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
/*
// Para el register_permission
exports.CargaMasivaPermisos = function(user){
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
}*/

exports.CargaMasivaPermisosBloqueados = function(user){
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
/*
// Para el register_permission
exports.CargaMasivaPermisosBloqueados = function(user){
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
}*/
