const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var usersSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    phone: { type: String, default: "" },
    image: { type: String, default: "" },
    shopname: { type: String, default: "" },
    shopimage: { type: String, default: "" },
    birthday: { type: String, default: "" },
    about: { type: String, default: "" },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", usersSchema);
module.exports = userModel;
