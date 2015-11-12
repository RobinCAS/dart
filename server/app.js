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
  app.listen(3001, function() {
    console.log('***********************************');
    console.log('listening:', 3000);
    console.log('***********************************');
  });
});

// app.get('/', function(req, res){
//   res.send('hello world');
// });

app.use('/users', require('./routes/users.js'));
