
const news = require('./../controller/news');
var path = require('path');
//GraphQL Routs

module.exports = function(app) {
  app.get('/pushNews',news.pushNews);
  app.get('/getNews',news.getNews);

}