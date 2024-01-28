let User = require('../models/user');

let cors = require('cors');

let express = require('express');
let app = express();
app.use(cors());

exports.postUser = (req,res,next) =>{
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