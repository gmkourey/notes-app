const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require('./routes/api');
// require('dotenv').config()

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
else {
  app.use(express.static("public"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/notes-app", {useNewUrlParser: true});

app.use(routes);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});


app.listen(PORT, function() {
    console.log("App running on port 3001!");
  });