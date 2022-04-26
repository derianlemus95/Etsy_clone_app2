const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var itemsSchema = new Schema(
  {
    name: { type: String, default: "" },
    category: { type: String, default: "" },
    price: { type: Number, default: 0 },
    description: { type: String, default: "" },
    shopOwner: { type: String, default: "" },
    quantity: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    image: { type: String, default: "" },
    shopname: { type: String, default: "" },
    giftDesc: { type: String, default: "" },
  },
  {
    versionKey: false,
  }
);

const itemModel = mongoose.model("item", itemsSchema);
module.exports = itemModel;
