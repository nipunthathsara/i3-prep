var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');

var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));//log every request to the console

require('./app/model/database.js');//this line connects to the database

app.listen(PORT);
console.log("listening on port " + PORT);

require('./config/passport.js');//call this after database is called,because passport is using the user model
var routes = require('./app/routes.js');

app.use(passport.initialize());//initializze before using the routes middleware
app.use('/',routes);//with empty base url

