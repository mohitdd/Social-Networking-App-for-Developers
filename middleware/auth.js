//Middleware to authenticate the request

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get the token from the header
  var token = req.header("x-auth-token");

  //See if the token is there
  if (!token) {
    return res.status(401).json({ msg: "No Token Authorization denied" });
  }

  //If the token is there then Verify it
  try {
    console.log(token);
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid, Authorization denied" });
  }
};
