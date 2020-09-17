const Sequelize = require('sequelize');

const dbConnection= require('../config/dbConnection').database;

//Creating Database Schemas
var User = dbConnection.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    host:Sequelize.STRING,
    port: Sequelize.STRING,
});

module.exports= User
