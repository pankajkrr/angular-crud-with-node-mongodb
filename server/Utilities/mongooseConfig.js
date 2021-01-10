var mongoose = require('mongoose');
mongoose.set('debug', true);
var config = require("../Utilities/config").config;

module.exports = function() {
    mongoose.Promise = require('bluebird');
    console.log(config.DB_URL.url);
    var db = mongoose.connect('mongodb://localhost:27017/angular6-crud');
    require('../Models/Document');

    return db;
};


// var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/angular6-crud', { useMongoClient: true, promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));