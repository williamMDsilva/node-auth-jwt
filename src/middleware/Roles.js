const users = require("../model/users");
const ROLESROUTES = require('../routes.config');
const jwt = require("jwt-simple");
const cfg = require("../config.js");

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization
    if(authorization){
        const token = authorization.split(" ")[1];
        const user = jwt.decode(token, cfg.jwtSecret)
        if(ROLESROUTES[req.path].includes(user.role)){
            return next();
        }
    }
    res.status(401).send({ error: "Unauthorized" });   
}