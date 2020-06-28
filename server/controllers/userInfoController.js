const router = require("express").Router();
const userInfo = require("../db").import("../models/userInfo");
const User = require("../db").import("../models/user");

router.post("/createuserinfo", (req, res) => {
  userInfo
    .create({
      dateOfBirth: req.body.userInfo.dateOfBirth,
      age: req.body.userInfo.age,
      heightInInches: req.body.userInfo.heightInInches,
      weightInPounds: req.body.userInfo.weightInPounds,
      goal: req.body.userInfo.goal,
      userId: req.user.id,
    })
    .then((userInfo) => res.status(200).json(userInfo))
    .catch((err) => console.log(err));
});

router.get("/getuser", (req, res) => {
  User.findOne({ where: { id: req.user.id }, include: ["userInfo", "logs"] })
    .then((info) => res.status(200).json(info))
    .catch((err) => res.status(500).json(err));
});

router.get("/getuserinfo", (req, res) => {
  userInfo
    .findOne({
      where: {
        userId: req.user.id,
      },
      include: "user",
    })
    .then(function createSuccess(data) {
      res.status(200).json({
        message: "User info found",
        data: data,
      });
    })
    .catch((err) => res.status(500).json("User info not found".err));
});

router.delete("/:id", (req, res) => {
  userInfo
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((info) =>
      res.status(200).json({
        info: info,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
