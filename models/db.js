const mysql = require('mysql2/promise');
const config = require('./../config.json');

const connection = mysql.createPool(config.mysql);

module.exports = connection;