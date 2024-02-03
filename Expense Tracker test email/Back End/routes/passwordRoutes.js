let express = require('express');
let router = express.Router();

let passwordController = require('../controllers/password')

router.post('/forgotpassword',passwordController.postForgotPassword);

module.exports = router;