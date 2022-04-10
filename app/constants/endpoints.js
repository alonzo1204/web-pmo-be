const endpoints = {
    API_NAME: '/api',
    API_VERSION: '/v1.0',
    CLIENTS_URL: {
        MAIN: '/clients',
        OPERATIONS: {
            LIST: '/',
            SAVE: '/save',
            GET_ONE: '/:idClient'
        }
    },
    AUTH_URL: {
        MAIN: '/auth',
        OPERATIONS: {
            LOGIN: '/login',
            REGISTER: '/register',
            REGISTER_BATCH: '/register/batch',
            LOGOUT: '/logout',
            RECOVER_PASSWORD: '/recover'

        }
    },
    USER_URL: {
        MAIN: '/users',
        OPERATIONS: {
            LIST: '/',//done
            SAVE: '/save',
            DOWN: '/down/?idUser=:idUser',//done
            GET_ONE: '/:idUser',
        }
    },
    PROJECT_URL: {
        MAIN: '/projects',
        OPERATIONS: {
            LIST: '/', //done
            LIST_APPROVED: '/approved',
            SAVE: '/save', //done
            SAVEEXCEL: '/saveExcel',//done
            UPDATE: '/update',
            GET_STATUS: '/?idState=:idState',//done
            DENIED: '/denegar/?idProject=:idProject',//working
            ACCEPT: '/aceptar/?idProject=:idProject',//working
            ACCETEDWCOMS: '/aceptarComens/?idProject=:idProject',//working
            UPDATE_STATE: '/?idProject=:idProject&idState=:idState',//done
            GET_ONE: '/:idProject'
        }
    },
    POSTULATION_URL: {
        MAIN: '/postulations',
        OPERATIONS: {
            LIST: '/', //done
            SAVE: '/save', //done
            GET_ONE: '/:idPostulation'
        }
    },
    CAREER_URL: {
        MAIN: '/careers',
        OPERATIONS: {
            LIST: '/', //done
            SAVE: '/save',
            GET_ONE: '/:idCareer'
        }
    },
    GROUP_URL: {
        MAIN: '/group',
        OPERATIONS: {
            LIST: '/', //done
            SAVE: '/save',
            GET_ONE: '/:idgroup',
            GET_GROUP: '/mygroup'
        }
    },
    ROLE_URL: {
        MAIN: '/roles',
        OPERATIONS: {
            LIST: '/', //done
            SAVE: '/save',
            GET_ONE: '/:idRole'
        }
    },
    SEMESTER_URL: {
        MAIN: '/semester',
        OPERATIONS: {
            LIST: '/', //done
            SAVE: '/save',
            GET_ONE: '/:idSemester'
        }
    },
    COMPANY_URL: {
        MAIN: '/companies',
        OPERATIONS: {
            LIST: '/', //done
            SAVE: '/save',
            GET_ONE: '/:idCompany'
        }
    },
    PORTFOLIO_URL: {
        MAIN: '/portfolios',
        OPERATIONS: {
            LIST: '/'
        }
    }
}

module.exports = {
    endpoints
}