const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./middleware/Auth.js")();
const app = express();
const Cors = require('Cors')

const routes = require("./routes");

app.use(Cors())
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(routes);

module.exports = app;