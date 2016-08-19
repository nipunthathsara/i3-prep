var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

//sign up controller - passport is not involved
module.exports.register = function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    
    user.save(function(err){
        var token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });
};

//login controller
module.exports.login = function(req, res){
      //console.log('controller reached');
      passport.authenticate('local', function(err, user, info){
          //if error
          if(err){
              res.status(404).json(err);
              return;
          }
          //if user found
          if(user){
              var token = user.generateJwt();
              res.status(200).json({"token" : token});
          }
          //if user not found
          else{
              res.status(401).json(info);
          }
      })(req, res);
};