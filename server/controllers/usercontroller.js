const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signup
router.post("/register", (req, res) => {
  console.log(req.body);
  User.create({
    userName: req.body.userName,
    passwordhash: bcrypt.hashSync(req.body.passwordhash, 10),
  }).then(
    (createSuccess = (user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "user created",
        sessionToken: token,
      });
    })((createError = (err) => res.send(500, err)))
  );
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  }).then(
    (user) => {
      if (user) {
        bcrypt.compare(
          req.body.passwordhash,
          user.passwordhash,
          (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });
              res.json({
                user: user,
                message: "user succesfully loged in",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "bad gateway" });
            }
          }
        );
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    (err) => res.status(501).send({ error: "falled to proccess" })
  );
});

module.exports = router;
