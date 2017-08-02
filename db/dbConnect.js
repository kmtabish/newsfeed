var http = require('http');
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/newsfeed";  // local
var url = "mongodb://tabblack:blackblack@ds127993.mlab.com:27993/newsfeed";  // Prod

module.exports = url;
