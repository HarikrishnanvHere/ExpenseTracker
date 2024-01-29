let express = require('express');
let router = express.Router();

let expenseController = require('../controllers/expense');

router.post('/addexpense',expenseController.postExpense);

router.get('/getexpense',expenseController.getExpense);

router.get('/deleteexpense/:expenseId',expenseController.deleteExpense);

module.exports = router;

