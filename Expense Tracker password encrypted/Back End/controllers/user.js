let User = require('../models/user');
let bcrypt = require('bcrypt');

let cors = require('cors');

let express = require('express');
let app = express();
app.use(cors());

const hashrounds = 10;

exports.postSIgnUpUser = (req,res,next) =>{
    try{
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        //console.log(name,email,password);

        bcrypt.hash(password, hashrounds, async (err, hash) =>{
            console.log(err);
            await User.create({
                name: name,
                email: email,
                password: hash
            })
            .then((data)=>{
                res.send(data);
            })
            .catch(err=>res.send(err));
        })
    }catch{
        (err=>res.send(err))
    }
}

exports.postLogInUser = (req,res,next) =>{
    try{
        let email = req.body.email;
        let password = req.body.password;
        User.findByPk(email)
        .then((data)=>{
            bcrypt.compare(password, data.password, (err, result)=>{
                if(err){
                    console.log(err);
                }
                else if(result === true){
                    res.send("LogIn Successful");
                }
                else if(result === false){
                    res.send("Error Code 401 - User Not Authorized!");
                }
            })

        //     if(data.password === password){
        //         res.send("LogIn Successful");
        //     }
        //     else{
        //         res.send("Error Code 401 - User Not Authorized!");
        //     }
        })
        .catch(err=>{
            res.send("Error Code 401 - User not Found!");
         })
    }catch{
        (err=>console.log(err));
    }
}