const express = require('express');

let userController = require('./controllers/user');

let router = express.Router();

router.post('/signup',userController.postUser);

module.exports = router;
