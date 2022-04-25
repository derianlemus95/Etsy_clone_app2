const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var cartsSchema = new Schema(
  {
    user: { type: String, default: "" },
    quantity: { type: Number, default: "" },
    price: { type: Number, default: 0 },
    itemId: { type: String, default: "" },
    total: { type: Number, default: 0 },
    isGift: { type: Number, default: 0 },
    giftDesc: { type: String, default: "" },
  },
  {
    versionKey: false,
  }
);

const cartModel = mongoose.model("cart", cartsSchema);
module.exports = cartModel;
