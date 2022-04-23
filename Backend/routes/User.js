"use strict";
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const multer = require("multer");
const Users = require("../Models/UserModel");
const path = require("path");

//handle profile pic directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, "uploads/" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

// uploads
router.use("/", express.static(path.join(__dirname, "/")));
//update profile api
router.post("/update", checkAuth, upload.single("image"), (req, res) => {
  //console.log(req.file);
  if (req.file == undefined) {
    imagename = "";
  }
  let username = req.body.username;
  console.log(req.body);
  //fisrt retrieve profile info from user
  Users.findOne({ email: username }, (error, myresult) => {
    if (error) {
      res.writeHead(201, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      //if value entry is blank, db will update
      //else leave value the same
      console.log("Viewing profile result");
      console.log(myresult);
      //let result = Object.assign({}, ...myresult);
      let result = myresult;
      console.log(result);
      console.log("Viewing profile result copy");
      let image = "";
      if (req.file == undefined) {
        image = result.image;
      } else {
        image = req.file.filename;
      }
      let name = req.body.name === "" ? result.name : req.body.name;
      let email = req.body.email === "" ? result.email : req.body.email;
      let about = req.body.about === "" ? result.about : req.body.about;
      let phone = req.body.phone === "" ? result.phone : req.body.phone;
      let address = req.body.address === "" ? result.address : req.body.address;
      let country = req.body.country === "" ? result.country : req.body.country;
      let birthday =
        req.body.birthday === "" ? result.birthday : req.body.birthday;
      let city = req.body.city === "" ? result.city : req.body.city;
      console.log(name);
      //update db
      if (myresult) {
        Users.updateOne(
          { email: username },
          {
            $set: {
              name: name,
              address: address,
              city: city,
              country: country,
              phone: phone,
              image: image,
              birthday: birthday,
              about: about,
            },
          },
          (err, result1) => {
            if (err) {
              res.writeHead(201, {
                "Content-Type": "text/plain",
              });
              res.end();
            }
            if (result1) {
              console.log(result1);
              res.writeHead(200, {
                "Content-Type": "text/plain",
              });
              res.end("Successful Update");
            } else {
              //password does not match account
              res.writeHead(201, {
                "Content-Type": "text/plain",
              });
              res.end("Not able to update");
            }
          }
        );
      } else {
        res.end("Unsuccessful Login");
      }
    }
  });
});

//register new shop
router.post("/registerShop", function (req, res) {
  //shopName
  //username
  Users.findOne({ shopName: req.body.shopName }, (error, result) => {
    if (result) {
      res.writeHead(201, {
        "Content-Type": "text/plain",
      });
      res.end("NAME TAKEN");
    } else {
      Users.updateOne(
        { email: req.body.username },
        {
          $set: {
            shopName: req.body.shopName,
          },
        },
        (err, result1) => {
          if (err) {
            res.writeHead(201, {
              "Content-Type": "text/plain",
            });
            res.end("error");
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end("SHOP NAME VALID");
          }
        }
      );
    }
  });
});
module.exports = router;
