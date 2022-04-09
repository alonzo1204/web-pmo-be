const { server } = require('./server');
const { database } = require('./database');
const { endpoints } = require('./endpoints');
const { sendMail } = require('./mailer');
const { specs } = require('./swagger');

module.exports = {
    server,
    database,
    endpoints,
    specs,
    sendMail
}