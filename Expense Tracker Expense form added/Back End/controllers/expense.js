let Expense = require('../models/expense');

let cors = require('cors');
let express = require('express');
let app = express();
app.use(cors());

exports.postExpense = (req,res,next) =>{
    try{
        let {amount,description,category} = req.body;
        Expense.create({
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
        Expense.findAll()
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
        Expense.findByPk(expenseId)
        .then((expense)=>{
            expense.destroy();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }
    
}