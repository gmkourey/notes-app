var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var routes = require('./routes/api');

var PORT = 3001;

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/notes-app", {useNewUrlParser: true});

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