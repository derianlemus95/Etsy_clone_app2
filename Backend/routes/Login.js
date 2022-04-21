"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../Utils/config");
const Users = require("../Models/UserModel");
const { auth } = require("../utils/passport");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
auth();

//Route to handle Post Request Call
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  Users.findOne({ email: email }, (error, user) => {
    if (error) {
      res.send({ err: err });
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const payload = { _id: user._id, email: user.email };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          res.status(200).end("JWT " + token);
        } else {
          res.status(201).end("Invalid Credentials");
        }
      });
    } else {
      res.status(201).end("Invalid Credentials");
    }
  });
});

module.exports = router;
