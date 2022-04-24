"use strict";
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const multer = require("multer");
const Items = require("../Models/ItemModel");
const Users = require("../Models/UserModel");
const path = require("path");

//handle item pic directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, "/uploads/" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

// uploads
router.use("/", express.static(path.join(__dirname, "/")));
//update shop picture api
router.post(
  "/shopImageUpdate",
  checkAuth,
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
    let username = req.body.username;
    //fisrt retrieve profile info from user
    Users.updateOne(
      { email: username },
      {
        $set: {
          shopimage: req.file.filename,
        },
      },
      (err, result) => {
        if (result) {
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
  }
);

//API got get shop items and details
router.post("/getShopData", checkAuth, (req, res) => {
  console.log(req.body);
  let shopDetails = [];
  let owner = false;
  Items.find({ shopname: req.body.shopname }, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      //shopDetails.push(result);
      //console.log(result);
      shopDetails.push(result);
      Users.find({ shopname: req.body.shopname }, (err, myresult) => {
        if (err) {
          res.send({ err: err });
        } else {
          //console.log(myresult);
          console.log(myresult[0].email);
          if (myresult[0].email == req.body.username) {
            owner = true;
          }
          //console.log(owner);
          shopDetails.push(myresult);
          shopDetails.push(owner);
          //console.log(shopDetails);
          console.log(JSON.stringify(shopDetails));
          res.send(shopDetails);
        }
      });
    }
  });
});

router.post("/addItem", checkAuth, upload.single("image"), (req, res) => {
  let username = req.body.username;
  Users.find({ email: username }, (err, result) => {
    if (result) {
      const item = new Items({
        name: req.body.itemname,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        shopOwner: username,
        quantity: req.body.quantity,
        salesCount: 0,
        image: req.file.filename,
        shopname: result[0].shopname,
      });
      item.save((err) => {
        if (err) {
          res.send({ err: err });
        } else {
          //console.log("im here");
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("Succesful Accont Created");
        }
      });
    } else {
      //password does not match account
      res.writeHead(201, {
        "Content-Type": "text/plain",
      });
      res.end("Not able to add");
    }
  });
});

router.post("/getproducts", (req, res) => {
  //console.log("Inside Home");
  let term = "%" + req.body.term + "%";
  let minPrice = req.body.minPrice;
  let maxPrice = req.body.maxPrice;
  let sortBy = req.body.selectedOption;
  let myquery;
  let values;
  //check if price range is active
  //oerder by default is ascending order
  if (minPrice >= 0 && maxPrice > 0) {
    myquery =
      "SELECT * FROM products WHERE (name LIKE %term%) AND (price BETWEEN 4 AND 50) ORDER BY price";
    values = [term, minPrice, maxPrice, sortBy];
  } else {
    Items.find({ name: new RegExp(req.body.term, "i") }, (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        //console.log("Products : ",JSON.stringify(result));
        res.send(JSON.stringify(result));
      }
    }).sort({ sortBy: 1 });
  }
});
module.exports = router;
