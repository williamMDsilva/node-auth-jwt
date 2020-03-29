const jwt = require("jwt-simple");
const users = require("../model/users.js");
const cfg = require("../config.js");

module.exports ={
    Auth(req, res) {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            const user = users.find((u) => u.email === email && u.password === password);

            if (user) {
              const payload = user;
              const token = jwt.encode(payload, cfg.jwtSecret);
              res.json({ token });
            } else {
              res.sendStatus(401);
            }
          } else {
            res.sendStatus(401);
          }
    }
};
