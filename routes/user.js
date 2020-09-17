const express=require('express');
const User =require('../modules/users');
const sentMail =require('../modules/sentMail');
const db =require('../config/dbConnection');
const nodemailer=('../modules/nodemailer.js');

const router=express.Router();


//Route for the home page
router.get("/",(req,res)=>{
    res.render("sendMail.ejs");
});

//Route to add User details, no page for it yet
router.get("/addUser",(req,res)=>{
    const data = {
        name: "echefulouis",
        email: "echefulouis456@gmail.com",
        password:"louis3126",
        host:"smtp.gmail.com",
        port:587
    }
    User.create({
            name: data.name,
            password: data.password,
            email: data.email,
            host: data.host,
            port: data.port
        })
        .then(function(){
            console.log("User Added");
            res.redirect('/');
        })
        .catch((error)=>{
            console.log("Error Occurred: "+ error);
        });
});

//Route to add recipient detials
router.post("/add",(req,res)=>{
    var data = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        template: req.body.template,
    }

    //Class for creating a Sendmail record in the database
    sentMail.create({
            name: data.name,
            email: data.email,
            subject:data.subject,
            template: data.template,
        })
          .then(function(){
            User.findAll({ where: { id:1 } }).then(projects => {
                    console.log("About to confirm details......");
                    console.log(projects[0].dataValues);
                    console.log(data);
                    res.render('confirm.ejs',{data:data,projects:projects});
              })
        })
          .catch((error)=>{
            console.log("Error Occurred: "+ error);
        });
    
});


//Route to confirm Details before sending email
router.get("/sendmail",(req,res)=>{
    res.redirect("/");
})

module.exports=router;