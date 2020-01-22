const jwt = require("jsonwebtoken");
const secret = require("./secrets");
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.user = { username: decodeToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};
