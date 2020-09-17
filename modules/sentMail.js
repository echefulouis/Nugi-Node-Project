const Sequelize = require('sequelize');

const dbConnection= require('../config/dbConnection').database;

//Creating Database Schemas
var sentMail = dbConnection.define('sentMail', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    subject: Sequelize.STRING,
    template: Sequelize.STRING
});
module.exports= sentMail