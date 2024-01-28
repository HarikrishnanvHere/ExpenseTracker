let sequelize = require('../database');

let Sequelize = require('sequelize');

let User = sequelize.define('user',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }

    
});

module.exports = User;