'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "application_settings", deps: []
 * createTable "career", deps: []
 * createTable "company", deps: []
 * createTable "edit_request", deps: []
 * createTable "group", deps: []
 * createTable "history_postulations", deps: []
 * createTable "history_projects", deps: []
 * createTable "hs_access", deps: []
 * createTable "hs_session", deps: []
 * createTable "portfolio", deps: []
 * createTable "portfolio_state", deps: []
 * createTable "postulation", deps: []
 * createTable "project", deps: []
 * createTable "project_process_state", deps: []
 * createTable "registration_permissions", deps: []
 * createTable "role", deps: []
 * createTable "semester", deps: []
 * createTable "user", deps: []
 * createTable "user_rol", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "Migrations",
    "created": "2022-06-12T06:21:20.789Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "application_settings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "career",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "company",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "edit_request",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "group",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "history_postulations",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "history_projects",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "hs_access",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "hs_session",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "portfolio",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "portfolio_state",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "postulation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "project",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "project_process_state",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "registration_permissions",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "role",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "semester",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user_rol",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
