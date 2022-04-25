const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var purchasesSchema = new Schema(
  {
    user: { type: String, default: "" },
    quantity: { type: Number, default: "" },
    itemId: { type: String, default: "" },
    total: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const purchaseModel = mongoose.model("purchase", purchasesSchema);
module.exports = purchaseModel;
