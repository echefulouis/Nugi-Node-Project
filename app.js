const express = require('express');
const bodyParser=require('body-parser');
const Sequelize=require('sequelize');
const dbConnection=require('./config/dbConnection').database;
const app = express();
const user =require('./modules/users');
const sentMail=require("./modules/sentMail")

const path=require('path');
app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Testing db
dbConnection.authenticate()
  .then(function(){
    console.log('Connected to Database.......');
  })
  .catch(function(err){
    console.log('error: '+err);
  });



//Routingcd 
app.get('/',function(req,res){
  //Creating tables
user.sync();
sentMail.sync();

  sentMail
  .findAndCountAll({
  })
  .then(result => {
    console.log(result.count);
    console.log(result.rows);
    res.render("home.ejs",{count:result.count,data:result.rows});
  });
    
});

//Routing
app.use('/user',require('./routes/user'));


//Listen to Port
app.listen(3000, (req,res)=>{
    console.log('Started on Port: 3000')
});