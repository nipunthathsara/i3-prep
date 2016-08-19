var mongoose= require('mongoose');
var User = mongoose.model('User');

module.exports.profile = function(req, res){
    if (!req.payload._id) {
        console.log("reached1");
        //res.redirect('/login');
        res.status(401).json({
        "message" : "Unauthorized access"
        });
    } else {
        console.log("reached1");
        User
        .findById(req.payload._id)
        .exec(function(err, user) {
            res.status(200).json(user);
        });
    }
};