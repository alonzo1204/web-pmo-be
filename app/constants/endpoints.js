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
            SENDSOL: '/getauth',
            REGISTER_BATCH: '/register/batch',
            LOGOUT: '/logout',
            RECOVER_PASSWORD: '/recover',
            CHANGEPASSWORD: '/cambioPassword'
        }
    },
    USER_URL: {
        MAIN: '/users',
        OPERATIONS: {
            LIST: '/',//done
            SAVE: '/save',
            DOWN: '/down/?idUser=:idUser',//done
            GET_ONE: '/:idUser',
            MASIVEREGISTER: '/registroMasivo',//working
            MREGISTERBLOCK: '/registroMasivoB',//working
            GET_ONE: '/:idUser'
        }
    },
    PROJECT_URL: {
        MAIN: '/projects',
        OPERATIONS: {
            LIST: '/', //done
            SEND_SOL: '/request_update',
            HANDLE_UPDATE: '/handle_update',
            LIST_APPROVED: '/approved',
            SAVE: '/save', //done
            SAVE_EXCEL: '/saveExcel',//done
            UPDATE: '/update',
            MUPDATE: '/mupdate',
            GET_STATUS: '/?idState=:idState',//done
            DENIED: '/denegar/?idProject=:idProject',//done
            ACCEPT: '/aceptar/?idProject=:idProject',//done
            ACCETED_COMMENTS: '/aceptarComens/?idProject=:idProject',//done
            SAVE_ARCH: '/saveArch/?idProject=:idProject',//working
            UPDATE_STATE: '/?idProject=:idProject?idState=:idState',//done
            GET_VARIOUS_STATUS:'/status/:idState',
            GET_MY_REQUEST_EDITS: '/my_request_edits',
            GET_ALL_REQUEST_EDITS: '/all_request_edits',
            SAVE_NEW_WITH_ARCHIVE: '/save_with_archive',
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
            SAVE: '/save',
            LIST: '/'
        }
    },
    APP_SETTINGS_URL: {
        MAIN: '/config',
        OPERATIONS: {
            GET_ONE: '/:idConfig',
            EDIT:'/edit/:idConfig'
        }
    }
}

module.exports = {
    endpoints
}