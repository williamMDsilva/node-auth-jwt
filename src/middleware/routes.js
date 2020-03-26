var express = require("express");
var router = express.Router();

const users = require("./model/users.js");

const AuthController = require("./controller/AuthController");

router.get("/", (req, res) => {
  res.json({ status: "My API is alive!" });
});

router.get("/user", auth.authenticate(), (req, res) => {
  res.json(users[req.user.id]);
});

router.post("/token", AuthController.Auth);

module.exports = router;
