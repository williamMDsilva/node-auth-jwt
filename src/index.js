var express = require("express");
var bodyParser = require("body-parser");
var auth = require("./middleware/Auth.js")();
var app = express();

const routes = "./middleware/routes.js";

app.use(bodyParser.json());
app.use(auth.initialize());

app.use(routes);

app.listen(3000, function() {
  console.log("My API is running...");
});

module.exports = app;
