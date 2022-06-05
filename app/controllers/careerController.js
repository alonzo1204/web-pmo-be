const { endpoints } = require('../constants');
const { CareerService } = require('../services');

const URLBASE_MYSQLCONN=endpoints.API_NAME+endpoints.API_VERSION.MYSQLCONN+endpoints.GROUP_URL.MAIN
const URLBASE_SEQUELIZECONN=endpoints.API_NAME+endpoints.API_VERSION.SEQUELIZECONN+endpoints.GROUP_URL.MAIN

exports.getFullList = function (req, res) {
    if(req.baseUrl==URLBASE_MYSQLCONN){
        CareerService.getFullListV1().then(function (result) {
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
    }else if(req.baseUrl==URLBASE_SEQUELIZECONN){
        CareerService.getFullListV2().then(function (result) {
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
    
}