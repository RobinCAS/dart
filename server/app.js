var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var morgan = require('morgan');

var app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

var models = require('./models');
models.sequelize.sync().then(function(){
  app.listen(3000, function() {
    console.log('***********************************');
    console.log('listening:', 3000);
    console.log('***********************************');
  });
});

// {force: true}


app.use('/users', require('./routes/users.js'));
app.use('/dart_apps', require('./routes/dart_apps.js'));
