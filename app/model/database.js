var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/i3';
/*if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}*/


require('./users.js');

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbUrl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});