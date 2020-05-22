var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dashboard');
let db = mongoose.connection;

//check for connection
db.once('open', function () {
  console.log('connected to Mongo db ');
})

//checks for dbs errors
db.on('error', err =>{
  console.log(err);
})

module.exports = db;