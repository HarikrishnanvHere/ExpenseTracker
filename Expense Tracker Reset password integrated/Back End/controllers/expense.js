let Expense = require('../models/expense');
let User = require('../models/user');
let sequelize = require('../database');


let cors = require('cors');
let express = require('express');
let app = express();
app.use(cors());


exports.postExpense = async (req,res,next) =>{
    try{
        let t = await sequelize.transaction();

        let {amount,description,category} = req.body;
        const data = await req.user.createExpense({
            amount: amount,
            description: description,
            category: category
        }, {transaction: t});
        let totalAmount = req.user.total + parseInt(amount);
        await req.user.update({total: totalAmount},{transaction: t});

        await t.commit();
        res.status(201).json({data: data})

        
        //Promise.all([promise1,promise2]).then(data=>res.status(200).json({data: data[0]})).catch(err=>res.status(400).json({message: "Invalid Entry"}));
    }
    catch (err){
        const t = await sequelize.transaction();
        await t.rollback();
        res.status(500).json({message: "Something went wrong! please try again"})
    }
    
}

exports.getExpense = (req,res,next) =>{
    try{
        let isPremium = req.user.isPremiumUser;
        //console.log(isPremium);
        req.user.getExpenses()
        .then((expenses)=>{
            res.status(200).json({data:expenses, premium: isPremium});
        })
        .catch(err=>console.log(err));
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteExpense = async (req,res,next) =>{
    try{

        const t = await sequelize.transaction();
        let expenseId = req.params.expenseId; 
        let expense = await Expense.findOne({where: {id: expenseId, userId: req.user.id}},{transaction: t});
        let updatedAmount =  parseInt(req.user.total) - parseInt(expense.amount);
        await expense.destroy({transaction: t});
        await req.user.update({total : updatedAmount}, {transaction: t});
        await t.commit();
        res.status(204).json({message: "Deletion Successful"});


        // let amount;
        // let expenseId = req.params.expenseId; 
        // let promise1 = await Expense.findAll({where: {id: expenseId, userId: req.user.id}})
        //     .then((expense)=>{
        //         amount = expense[0].amount;
        //         expense[0].destroy();
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
        // let updatedTotal = req.user.total - parseInt(amount);
        // let promise2 = await req.user.update({total: updatedTotal});

        // Promise.all([promise1,promise2])
        // .then((data)=>res.status(200).send(data))
        // .catch(err=>res.status(500).json({message: "Something went wrong!"}));
    }
    catch(err){
        const t = await sequelize.transaction();
        await t.rollback();
        res.status(500).json({message: "something went wrong"});
    }
    
}