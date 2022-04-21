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
router.post("/register", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    Users.findOne({ email: req.body.email }, (error, user) => {
      if (user) {
        res.send(201).end("User already exists");
      } else {
        const user = new Users({ email: email, password: hash, name: name });
        user.save((err) => {
          if (err) {
            res.send({ err: err });
          } else {
            console.log("im here");
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end("Succesful Accont Created");
          }
        });
      }
    });
  });
});

module.exports = router;
