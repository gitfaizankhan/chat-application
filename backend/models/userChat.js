const Sequelize = require('sequelize');
const dbConnect = require('../utils/connection');

require('dotenv').config();

const chats = dbConnect.define(process.env.DB_CHAT_MESSAGE, {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    msg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user2:{
        type: Sequelize.INTEGER
    } 
});

module.exports = chats;