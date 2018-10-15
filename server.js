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

var MONGODB_URI = "mongodb://localhost/notes-app";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.use(routes);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});


app.listen(PORT, function() {
    console.log("App running on port 3001!");
  });