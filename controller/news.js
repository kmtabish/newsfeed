const url = require('../db/dbConnect')
var MongoClient = require('mongodb').MongoClient;
var dbc;
let NewsAPI = require('newsapi');
let newsapi = new NewsAPI('9049f96fa0804699ac9c8abb60712b89');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("MONGO DB Connected");
  dbc = db;
});

module.exports = {
  pushNews:function(req, res){
    newsapi.articles({
  source: req.query.newsSource, // required
  sortBy: 'latest' // optional
}).then(articlesResponse => {
   dbc.collection("topnews").insertMany(articlesResponse.articles, function(err, result) {
        if (err) throw err;
        console.log("Many record inserted");
        res.send("DATA INSERTED....");
      });
    });
  },
  getNews:function(req, res){
    dbc.collection("topnews").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  },
  getBookmarkNews:function(req, res){
    dbc.collection("bookmarknews").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  },
  pushBookmarkNews:function(req, res){
    dbc.collection("bookmarknews").insert(articlesResponse.articles, function(err, result) {
         if (err) throw err;
         console.log("Many record inserted");
         res.send("DATA INSERTED....");
       });
  },
  removeTopNews:function(req, res) {
    dbc.collection('topnews', {}, function(err, contacts) {
        contacts.remove({}, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
    });
  }
}
