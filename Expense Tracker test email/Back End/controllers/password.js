let dotenv = require('dotenv');
dotenv.config();

let express = require('express');
let app = express();
let cors = require('cors');
app.use(cors);

const Sib = require('sib-api-v3-sdk');


exports.postForgotPassword = async (req,res,next) =>{

    try{
        
        let recoveryMail = req.body.recoveryMail;
        let BREVO_API_KEY = process.env.BREVO_API_KEY;
        //console.log(BREVO_API_KEY);

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        //console.log(apiKey);
        apiKey.apiKey = BREVO_API_KEY;
        const tranEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email : 'itsmeharikrishnanv@gmail.com'
        }

        const receivers = [
            {
                email : recoveryMail
            }
        ]

        await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Test Mail",
            textContent : "Your password is HARI"
        })
        .then(data=>{
            console.log(data);
            res.status(201).json({message: "e-mail successfully sent!!"})
        } )
        .catch(err=>res.status(401).json({message: "please enter a valid mail id"}))
    }catch(err){
        res.status(401).json({message: "something went wrong"});
    }
    
}