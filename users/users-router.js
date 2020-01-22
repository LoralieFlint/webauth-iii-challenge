const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const secret = require("./config/secrets");

const userModel = require("./users-model");
const router = express.Router();

function generateToken(user) {
  const payload = {
    user: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

router.get("/users", (req, res, next) => {
  userModel
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/register", async (req, res, next) => {
  try {
    const saved = await userModel.add(req.body)
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.headers
    const user = await userModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      const token = generateToken(user);
      res.status(200).json({
        token,
        message: `Welcome ${user.username}!`,
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
