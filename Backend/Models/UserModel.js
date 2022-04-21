const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var usersSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    phoneNum: { type: String },
    image: { type: String },
    state: { type: String },
    shopName: { type: String },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", usersSchema);
module.exports = userModel;
