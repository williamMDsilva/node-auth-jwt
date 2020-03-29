const express = require("express");
const routes = express.Router();

const auth = require('./middleware/Auth')();
const roles = require('./middleware/Roles');

const users = require("./model/users.js");

const AuthController = require("./controller/AuthController");

const ROLESROUTES = require('./routes.config');

routes.get("/", (req, res) => {
  res.json({ status: "My API is alive!" });
});

routes.get("/user", auth.authenticate(), roles, (req, res) => {
  res.json(users[req.user.id]);
});

routes.post("/token", AuthController.Auth);

module.exports = routes;
