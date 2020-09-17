const Sequelize=require('sequelize');

const dbConnection = new Sequelize('Users', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports={
  database: dbConnection
}

