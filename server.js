var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');//logs
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var database = require('./config/database');
var routes = require('./app/routes.js');
var port = process.env.PORT || 3000;//check env variable else use 3000

var app = express();

/*app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());*/

//adding Middleware that interrupts  every request (for REST APIs)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
//CORS support
app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect(database.url);
mongoose.connection.once('open',function(){//once db connection is established...
    app.listen(port);
    console.log('listening on port : ' + port); 
    
    //loading the models
    app.models = require('./app/models/index.js');//assigning models directly to the app, therefore can be used throughout the app
    
    _.each(routes, function(controller, route){ //lodash-iterates through each in 'routes' and, assign controller path (value)(./controllers/movieController.js) to controller(first arg) and route(key)(/movie) to route(2nd arg) of the call back function
        app.use(route,controller(app,route));//adding middleware to the app
    });
});


/*app.use('/hello', function(request,response,next){
    response.send('Hello balla');
    next();//calling next middleware
});*/