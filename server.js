var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var routes = require('./routes/api');
// require('dotenv').config()

var PORT = process.env.PORT || 3001;

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(express.static("public"));

// mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds117061.mlab.com:17061/heroku_7175wr6b`, {useNewUrlParser: true});
var MONGODB_URI = "mongodb://gmkourey:abc123@ds131963.mlab.com:31963/heroku_vtnm8z12" || "mongodb://localhost/notes-app";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
require("./routes/html/html-routes")(app);

app.use(routes);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});


app.listen(PORT, function() {
    console.log("App running on port 3001!");
  });