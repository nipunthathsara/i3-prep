var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var authenticationController = require('./controllers/authenticationController.js');
var profileController = require('./controllers/profileController.js');

//move secret to a env var
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);
router.get('/profile', auth, profileController.profile);

/*router.get('/profile', isLoggedIn,  profileController.profile);

//middleware - if not working try original way
function isLoggedIn(req, res, next){//am i using the token?
    if(req.user){
        next();
    }else{
        //res.redirect('/login');
        res.status(401).json({"message" : "Unauthorized access"});
    }
};*/

module.exports = router;