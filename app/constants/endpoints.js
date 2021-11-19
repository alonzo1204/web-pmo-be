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
            LIST: '/',
            SAVE: '/save',
            GET_ONE: '/:idUser'
        }
    },
    PROJECT_URL: {
        MAIN: '/projects',
        OPERATIONS: {
            LIST: '/',
            LIST_APPROVED: '/approved',
            SAVE: '/save',
            GET_ONE: '/:idProject'
        }
    },
    POSTULATION_URL: {
        MAIN: '/postulations',
        OPERATIONS: {
            LIST: '/',
            SAVE: '/save',
            GET_ONE: '/:idPostulation'
        }
    },
    CAREER_URL: {
        MAIN: '/careers',
        OPERATIONS: {
            LIST: '/',
            SAVE: '/save',
            GET_ONE: '/:idCareer'
        }
    },
    ROLE_URL: {
        MAIN: '/roles',
        OPERATIONS: {
            LIST: '/',
            SAVE: '/save',
            GET_ONE: '/:idRole'
        }
    },
    CYCLE_URL: {
        MAIN: '/cycles',
        OPERATIONS: {
            LIST: '/',
            SAVE: '/save',
            GET_ONE: '/:idCycle'
        }
    },
    COMPANY_URL: {
        MAIN: '/companies',
        OPERATIONS: {
            LIST: '/',
            SAVE: '/save',
            GET_ONE: '/:idCompany'
        }
    }
}

module.exports = {
    endpoints
}