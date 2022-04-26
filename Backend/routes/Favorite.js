"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../Utils/config");
const Items = require("../Models/ItemModel");
const Favorites = require("../Models/FavoriteModel");
const { auth } = require("../utils/passport");

auth();

router.post("/addToFavorites", (req, res) => {
  Favorites.create(
    {
      user: req.body.username,
      itemId: req.body.id,
    },
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result) {
        //ITEM STORED SUCCESSFULLY
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Successful Insert");
      } else {
        //FAILED TO ADD ITEM TO FAVORITES DB
        res.writeHead(201, {
          "Content-Type": "text/plain",
        });
        res.end("Unsuccessful Insert");
      }
    }
  );
  // })
});

router.post("/getMyFavorites", (req, res) => {
  var myanswer = [];
  Favorites.find(
    {
      user: req.body.username,
    },
    {
      itemId: 1,
      quantity: 1,
    },
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        let items = [];
        let quantity = [];
        result.map((re) => items.push(re.itemId));
        result.map((re) => quantity.push(re.quantity));
        if (items) {
          //var myanswer = [];
          var quantityPrice = 0;
          var total = 0;
          var mycombinedresult = [];
          var myitems = [];
          for (let i = 0; i < items.length; i++) {
            Items.find(
              {
                name: { $in: [items[i]] },
              },
              (err, result1) => {
                if (err) {
                  throw err;
                } else {
                  result1.map((re, index) => (re.quantity = quantity[index]));
                  console.log("this result" + result1);
                  myitems.push(...result1);
                  mycombinedresult = [...myitems];
                }
              }
            );
          }
          setTimeout(function () {
            var allresult = [];
            allresult.push(mycombinedresult);
            //allresult.push(total);
            //console.log("total " + total);
            console.log("Favorite Items : " + JSON.stringify(mycombinedresult));
            return res.status(200).send(JSON.stringify(mycombinedresult));
          }, 1000);
        } else {
          res.end("EMPTY");
        }
      }
    }
  );
});

module.exports = router;
