const jwt = require("jsonwebtoken");
const users = require("../model/users.js");
const cfg = require("../config.js");

module.exports = {
  Auth(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        const payload = user;
        // const  = jwt.encode(, );
        const token = jwt.sign(payload, cfg.jwtSecret, {
          algorithm: cfg.jwtAlgorithm,
          expiresIn: cfg.jwtExpiresIn
        });

        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  }
};
