let Expense = require('../models/expense');

let cors = require('cors');
let express = require('express');
let app = express();
app.use(cors());

exports.postExpense = (req,res,next) =>{
    try{
        let {amount,description,category} = req.body;
        req.user.createExpense({
            amount: amount,
            description: description,
            category: category
        })
        .then((expense)=>{
            res.status(200)
            res.send(expense);
        })
        .catch(err=>console.log(err));
    }
    catch(err){
        console.log(err);
    }
    
}

exports.getExpense = (req,res,next) =>{
    try{
        req.user.getExpenses()
        .then((expenses)=>{
            res.send(expenses);
        })
        .catch(err=>console.log(err));
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteExpense = (req,res,next) =>{
    try{
        let expenseId = req.params.expenseId; 
        Expense.findAll({where: {id: expenseId, userId: req.user.id}})
        .then((expense)=>{
            expense[0].destroy()
            .then(()=>res.status(200).json({message: "removal successful"}))
            .catch(err=>{res.status(400).json({message: "no product found"})

            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }
    
}