const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./database');

const app = express();
let cors = require('cors');
app.use(cors());

let userRoutes = require('./routes/userRoutes');
let expenseRoutes = require('./routes/expenseRoutes');

app.use(bodyParser.json({extended: true}))

app.use('/user', userRoutes);

app.use('/expense', expenseRoutes);

sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})