const users = require("../model/users");
const ROLESROUTES = require("../routes.config");
const jwt = require("jsonwebtoken");
const cfg = require("../config.js");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(" ")[1];

    try {
      var user = jwt.verify(token, cfg.jwtSecret);

      if (ROLESROUTES[req.path].includes(user.role)) {
        return next();
      }
    } catch (err) {
      return res.status(401).send({ message: "Unauthorized", error: err });
    }
  }

  return res.status(401).send({ message: "Unauthorized" });
};
