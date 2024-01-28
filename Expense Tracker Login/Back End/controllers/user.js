let User = require('../models/user');

let cors = require('cors');

let express = require('express');
let app = express();
app.use(cors());

exports.postSIgnUpUser = (req,res,next) =>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    console.log(name,email,password);
    User.create({
        name: name,
        email: email,
        password: password
    })
    .then((data)=>{
        res.send(data);
    })
    .catch(err=>res.send(err))
}

exports.postLogInUser = (req,res,next) =>{
    let email = req.body.email;
    let password = req.body.password;
    User.findByPk(email)
    .then((data)=>{
        if(data.password === password){
            res.send("LogIn Successful");
        }
        else{
            res.send("Enter Correct Password");
        }
    })
    .catch(err=>res.send("Enter Correct Email"));
}