var jwt = require("jwt-simple");
var users = require("./model/users.js");
var cfg = require("./config.js");

module.exports = () => {
    Auth(req, res) {
        if (req.body.email && req.body.password) {
            var email = req.body.email;
            var password = req.body.password;
            var user = users.find(function(u) {
              return u.email === email && u.password === password;
            });
            if (user) {
              var payload = { id: user.id };
              var token = jwt.encode(payload, cfg.jwtSecret);
              res.json({ token: token });
            } else {
              res.sendStatus(401);
            }
          } else {
            res.sendStatus(401);
          }
    }
};
