const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./database');

const app = express();
let cors = require('cors');
app.use(cors());

let userRoutes = require('./routes/userRoutes');
let expenseRoutes = require('./routes/expenseRoutes');

let User = require('./models/user');
let Expense = require('./models/expense');

app.use(bodyParser.json({extended: true}))

app.use('/user', userRoutes);

app.use('/expense', expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})