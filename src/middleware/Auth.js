var passport = require("passport");
var passportJWT = require("passport-jwt");
var users = require("./users.js.js");
var cfg = require("../../config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = () => {
  var strategy = new Strategy(params, (payload, done) => {
    var user = users[payload.id] || null;
    // validade roles and pass tokens
    if (user) {
      return done(null, { id: user.id });
    } else {
      return done(new Error("User not found"), null);
    }
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
