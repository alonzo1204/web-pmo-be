const { server } = require('./server');
const { database } = require('./database');
const { endpoints } = require('./endpoints');
const { sendMail } = require('./mailer');
const { setQuery } = require('./columnVerifier')
const { specs } = require('./swagger');
const { security } = require('./security');

module.exports = {
    server,
    database,
    endpoints,
    specs,
    security,
    sendMail,
    setQuery
}