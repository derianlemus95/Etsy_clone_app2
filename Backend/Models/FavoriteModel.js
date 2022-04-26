const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var favoritesSchema = new Schema(
  {
    user: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    itemId: { type: String, default: "" },
  },
  {
    versionKey: false,
  }
);

const favoriteModel = mongoose.model("favorite", favoritesSchema);
module.exports = favoriteModel;
