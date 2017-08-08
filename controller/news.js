const url = require('../db/dbConnect')
var MongoClient = require('mongodb').MongoClient;
var dbc;
let NewsAPI = require('newsapi');
let newsapi = new NewsAPI('9049f96fa0804699ac9c8abb60712b89');

MongoClient.connect(url, function(err, db) {
  if (err)
    throw err;
  console.log("MONGO DB Connected");
  dbc = db;
});

module.exports = {
  pushNews: function(req, res) {
    newsapi.articles({
      source: req.query.newsSource, // required
      sortBy: 'latest' // optional
    }).then(articlesResponse => {
      //  dbc.collection("topnews").insertMany(articlesResponse.articles, function(err, result) {
      //       if (err) throw err;
      //       console.log("Many record inserted");
      //       res.send("DATA INSERTED....");
      //     });
      var count = 0;
      articlesResponse.articles.map(function(data, index) {
        return dbc.collection("topnews").update({
          title: data.title
        }, {
          $set: {
            'title': data.title,
            'urlToImage': data.urlToImage,
            'description': data.description,
            'publishedAt': data.publishedAt,
            'url': data.url
          }
        }, {
          upsert: true
        }, function(err, result) {
          if (err) {
            return res.send(err);
          } else {
            count = count + 1;
            console.log("News data inserted", count, articlesResponse.articles.length);
            if (count == articlesResponse.articles.length) {
              res.json(result);
            }
          }

        })


      });

    });
  },
  getNews: function(req, res) {
    dbc.collection("topnews").find({}).sort({
      publishedAt: -1
    }).toArray(function(err, result) {
      if (err)
        throw err;
      res.send(result)
    });
  },
  getBookmarkNews: function(req, res) {
    dbc.collection("bookmarknews").find({
      userId: req.query.email
    }).sort({
      publishedAt: -1
    }).toArray(function(err, result) {
      if (err)
        throw err;
      res.send(result)
    });
  },
  pushBookmarkNews: function(req, res) {
    dbc.collection("bookmarknews").insertOne(req.body, function(err, result) {
      if (err)
        throw err;
      console.log("Bookmarked data inserted");
      res.send("DATA BookMarked....");
    });
  },
  removeTopNews: function(req, res) {
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
