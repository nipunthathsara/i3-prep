var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');//logs
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var _ = require('lodash');

var database = require('./config/database');
var port = process.env.PORT || 3000;//check env variable else use 3000

var app = express();

mongoose.connect(database.url);
mongoose.connection.once('open',function(){//once db connection is established...
    app.listen(port);
    console.log('listening on port' + port); 
    
    //loading the models
    app.models = require('./app/models/index.js');//assigning models directly to the app, therefore can be used throughout the app
});
    

/*app.use('/hello', function(request,response,next){
    response.send('Hello balla');
    next();//calling next middleware
});*/