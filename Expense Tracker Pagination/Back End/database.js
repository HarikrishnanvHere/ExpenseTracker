let Sequelize = require('sequelize');

let sequelize = new Sequelize('node-complete','root','neelimavarma1996',
{dialect : 'mysql', host: 'localhost'});

module.exports = sequelize;