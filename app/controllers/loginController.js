var restful = require('node-restful');//this creates rest apis using the mongoose models

module.exports = function(app,route){
    console.log("test2");
    //setting the controller for rest
    var rest = restful.model('User', app.models.user)//defining the name and model
    .methods(['get', 'put', 'post', 'delete']);//what APIs to expose
    
    rest.register(app,route);//registering the endpoiint with application
    
    return function(request, response, next){//return the middleware
        console.log("test3");
        next();
    };
};