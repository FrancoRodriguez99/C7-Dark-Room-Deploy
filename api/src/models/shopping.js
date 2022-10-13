const mongoose = require("mongoose");

const shoppingSchema = mongoose.Schema({
  photo_id: {
    type: mongoose.Types.ObjectId,
    ref: "challenges",
  },
  photo_url: {
    type: String,
  },
  photo_price: {
    type: String,
  },
  buyer_id: {
    type: mongoose.Types.ObjectId,
    ref: "challenges",
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
});

module.exports = mongoose.model("shopping", shoppingSchema);
