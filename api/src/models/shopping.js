const mongoose = require("mongoose");

const shoppingSchema = mongoose.Schema({
  photo_id: {
    type: mongoose.Types.ObjectId,
    ref: "publication",
  },
  transaction_id: {
    type: String,
  },
  photo_url: {
    type: String,
  },
  photo_price: {
    type: String,
  },
  buyer_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  payment_status: {
    type: String,
  },
  date_approved: {
    type: String,
  },
  payment_method: {
    type: String,
  },
  cashed_out: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("shopping", shoppingSchema);
