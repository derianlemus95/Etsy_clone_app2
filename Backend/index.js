var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
const { mongoDB, frontendURL } = require("./Utils/config");
var cors = require("cors");
const multer = require("multer");
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
//use cors to allow cross origin resource sharing
app.use(
  cors({ origin: frontendURL, methods: ["GET", "POST"], credentials: true })
);

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

const Login = require("./routes/Login");
const Register = require("./routes/Register");
const Book = require("./routes/Book");
const User = require("./routes/User");
const Item = require("./routes/Item");
const Favorite = require("./routes/Favorite");
app.use("/auth", Login);
app.use("/auth", Register);
app.use("/book", Book);
app.use("/user", User);
app.use("/shop", Item);
app.use("/favorite", Favorite);
//start your server on port 3001
app.listen(3001, () => console.log("Server Listening on port 3001"));
