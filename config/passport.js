var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//console.log('passport reached');

passport.use(new localStrategy(
    //by default passport's usename field is username therefore change it to email, (password field is password)
    {
      usernameField : 'email'  
    },
    function(username, password, done){
        //console.log('passport inner reached');
        User.findOne({email : username}, function(err, user){
            if(err){
                return done(err);//error
            }
            //if no matching email
            if(!user){
                return done(null, false, {message : 'User not found'});         
            }
            //if wrong password
            if(!user.validPassword(password)){
                return done(null, false, {message : 'Incorrect password'});
            }
            //if all good
            return done(null,user);
        });
    }
));