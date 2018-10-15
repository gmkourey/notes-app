const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
// require('dotenv').config()

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds117061.mlab.com:17061/heroku_7175wr6b`, {useNewUrlParser: true});
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.connect("mongodb://localhost/notes-app", {useNewUrlParser: true});
require("./routes/html/html-routes")(app);

app.use(routes);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});


app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
  });