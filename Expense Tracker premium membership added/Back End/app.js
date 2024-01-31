const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./database');

const app = express();
let cors = require('cors');
app.use(cors());

let userRoutes = require('./routes/userRoutes');
let expenseRoutes = require('./routes/expenseRoutes');
let premiumRoutes = require('./routes/premiumRoutes');

let User = require('./models/user');
let Expense = require('./models/expense');
let Order = require('./models/order');

app.use(bodyParser.json({extended: true}))

app.use('/user', userRoutes);
app.use('/purchase',premiumRoutes);
app.use('/expense', expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})