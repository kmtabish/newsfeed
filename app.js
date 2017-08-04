const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const db = require('./db/dbConnect')

//require mongoose node module

const PORT = process.env.PORT || 1111;

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

// get all data/stuff of the body (POST) parameters
// app.use(bodyParser.json()); // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type", "Accept");
  next();
});
// app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUTapp.use(express.static(__dirname + '/public'));
require('./routes/routes')(app);;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
