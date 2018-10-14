var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var routes = require('./routes/api');
require('dotenv').config()

var PORT = process.env.PORT || 3001;

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

// app.use(express.static("public"));
app.use(express.static("client/build"));

// mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds117061.mlab.com:17061/heroku_7175wr6b`, {useNewUrlParser: true});
// mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds131903.mlab.com:31903/heroku_x35lf8pl`, {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost/notes-app", {useNewUrlParser: true});

var MONGODB_URI = process.env.MONGODB_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// require("./routes/html/html-routes")(app);

app.use(routes);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});


app.listen(PORT, function() {
    console.log("App running on port 3001!");
  });