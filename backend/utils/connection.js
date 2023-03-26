const Sequelize = require('sequelize');
require('dotenv').config();
const dbConnect = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSOWRD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
}); 

module.exports = dbConnect;