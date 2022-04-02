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
            LOGOUT: '/logout'
        }
    },
    USER_URL: {
        MAIN: '/users',
        OPERATIONS: {
            LIST: '/',//done
            SAVE: '/save',
            GET_ONE: '/:idUser'
        }
    },
    PROJECT_URL: {
        MAIN: '/projects',
        OPERATIONS: {
            LIST: '/', //done
            LIST_APPROVED: '/approved',
            SAVE: '/save', //done
            SAVEEXCEL: '/saveExcel',//viendo
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
    }
}

module.exports = {
    endpoints
}