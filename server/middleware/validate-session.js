const jwt = require("jsonwebtoken");
const User = require("../db").import("../models/user");

const validateSession = (req, res, next) => {
  if (req.method == "OPTIONS") {
    next();
  } else {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err && decoded) {
        // console.log(decodedToken);
        User.findOne(
          {
            where: {
              id: decoded.id,
            },
          }
          // console.log(decodedToken)
        )
          .then((user) => {
            if (!user) throw "err";
            req.user = user;
            return next();
          })
          .catch((err) => next(err));
      } else {
        console.log("Error");
        req.errors = err;
        return res.status(500).send(
          res.json({
            err: err,
          })
        );
      }
    });
  }
};

module.exports = validateSession;
