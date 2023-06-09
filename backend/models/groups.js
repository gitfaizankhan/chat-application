const { DataTypes } = require('sequelize');
const dbConnect = require('../utils/connection');
require('dotenv').config();

const Group = dbConnect.define(process.env.DB_GROUP, {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    } 
});


const GroupAdmin = dbConnect.define('GroupAdmin', {}, { timestamps: false });
const User_Group = dbConnect.define('User_Group', {}, { timestamps: false });

module.exports = {
    Group,
    User_Group,
    GroupAdmin
}

