"use strict";
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const multer = require("multer");
const Items = require("../Models/ItemModel");
const Users = require("../Models/UserModel");
const Carts = require("../Models/CartModel");
const Purchases = require("../Models/PurchaseModel");
const path = require("path");

//handle item pic directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../");
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

router.post("/addMessage", (req, res) => {
  console.log("message api");
  console.log(req.body);

  Items.findOneAndUpdate(
    { name: req.body.id },
    { giftDesc: req.body.messages },
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send("SUCCESS");
      }
    }
  );
});
router.post("/deleteItem", (req, res) => {
  console.log("message api");
  console.log(req.body);
  Carts.deleteMany(
    {
      user: req.body.username,
      itemId: req.body.id,
    },
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.send("SUCCESS");
      }
    }
  );
});

router.post("/updateQuantity", (req, res) => {
  console.log("quantity api");
  console.log(req.body);

  Carts.findOneAndUpdate(
    { user: req.body.username, itemId: req.body.id },
    { quantity: req.body.quantity },
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send("SUCCESS");
      }
    }
  );
});

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

router.post("/getitem", function (req, res) {
  //console.log(req.body)
  Items.find({ name: req.body.id }, (err, result) => {
    if (err) {
      res.writeHead(201, {
        "Content-Type": "text/plain",
      });
      res.end("Error");
    }
    if (result) {
      // {user}JSON.stringify(books)
      //return succes to front end
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(201, {
        "Content-Type": "text/plain",
      });
      res.end("NO ITEM FOUND");
    }
  });
});

//insert cart
router.post("/addToCart", (req, res) => {
  console.log("Adding to Cart");
  console.log(req.body.id.name);
  var newCart1 = [
    {
      user: req.body.username,
      quantity: req.body.quantity,
      itemId: req.body.id,
      //item: req.body.id,
    },
  ];
  Carts.insertMany(newCart1, (err, result) => {
    if (err) {
      res.writeHead(201, {
        "Content-Type": "text/plain",
      });
      res.end("Error trying to Insert");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Successful Insert");
    }
  });
});

router.post("/getCart", (req, res) => {
  var myanswer = [];
  Carts.find(
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
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  result.map((re, index) => (re.quantity = quantity[index]));
                  result.map(
                    (re, index) =>
                      (quantityPrice =
                        re.price * quantity[index] + quantityPrice)
                  );
                  //console.log(quantityPrice);
                  // mycombinedresult = [];
                  //mycombinedresult.push(result);
                  console.log("this result" + result);
                  myitems.push(...result);
                  mycombinedresult = [...myitems];
                  //mycombinedresult.push(quantityPrice.toString());
                  total = quantityPrice.toString();
                  //myanswer.push(result);
                  //myanswer.push(quantityPrice.toString());
                  //console.log(mycombinedresult);
                  // myanswer = mycombinedresult;
                  //response.json(quantityPrice);
                  //res.send(JSON.stringify(mycombinedresult));
                }
              }
            );
          }
          setTimeout(function () {
            var allresult = [];
            allresult.push(mycombinedresult);
            allresult.push(total);
            console.log("total " + total);
            console.log("Cart Items : " + JSON.stringify(allresult));
            return res.status(200).send(JSON.stringify(allresult));
          }, 1000);
        } else {
          res.end("EMPTY");
        }
      }
    }
  );
});

//api to handle confim purchase by user
router.post("/purchase", function (req, res) {
  const items = req.body.items;
  console.log(req.body);
  items.map((item) => {
    Purchases.insertMany(
      {
        user: req.body.username,
        quantity: item.quantity,
        itemId: item.name,
        total: req.body.total[0],
      },
      (error, result) => {
        if (error) {
          throw error;
        }
      }
    );
  });
  items.map((item) => {
    Carts.deleteMany(
      {
        user: req.body.username,
        itemId: item.name,
      },
      (error, result) => {
        if (error) {
          throw error;
        }
      }
    );
  });
  console.log("success");
  res.send("SUCCESS");
});

//get cart and total price
router.post("/purchaseHistory", (req, res) => {
  var myanswer = [];
  Purchases.find(
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
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  result.map((re, index) => (re.quantity = quantity[index]));
                  result.map(
                    (re, index) =>
                      (quantityPrice =
                        re.price * quantity[index] + quantityPrice)
                  );
                  //console.log(quantityPrice);
                  // mycombinedresult = [];
                  //mycombinedresult.push(result);
                  console.log("this result" + result);
                  myitems.push(...result);
                  mycombinedresult = [...myitems];
                  //mycombinedresult.push(quantityPrice.toString());
                  total = quantityPrice.toString();
                  //myanswer.push(result);
                  //myanswer.push(quantityPrice.toString());
                  //console.log(mycombinedresult);
                  // myanswer = mycombinedresult;
                  //response.json(quantityPrice);
                  //res.send(JSON.stringify(mycombinedresult));
                }
              }
            );
          }
          setTimeout(function () {
            var allresult = [];
            allresult.push(mycombinedresult);
            allresult.push(total);
            console.log("total " + total);
            console.log("Purchase History : " + JSON.stringify(allresult));
            return res.status(200).send(JSON.stringify(allresult));
          }, 1000);
        } else {
          res.end("EMPTY");
        }
      }
    }
  );
});
module.exports = router;
