const jwt = require("jsonwebtoken");
const secret = require("./secrets");
module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    jwt.verify(authorization, secret.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: err });
      } else {
        req.user = { username: decoded.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};
