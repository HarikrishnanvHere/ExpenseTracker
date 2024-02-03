const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./database');

const app = express();
let cors = require('cors');
app.use(cors());

let userRoutes = require('./routes/userRoutes');
let expenseRoutes = require('./routes/expenseRoutes');
let purchaseRoutes = require('./routes/purchaseRoutes');
let premiumRoutes = require('./routes/premiumRoutes');
let passwordRoutes = require('./routes/passwordRoutes');

let User = require('./models/user');
let Expense = require('./models/expense');
let Order = require('./models/order');
let Request = require('./models/forgotPassword');

app.use(bodyParser.json({extended: true}))

app.use('/user', userRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/expense', expenseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Request);
Request.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})