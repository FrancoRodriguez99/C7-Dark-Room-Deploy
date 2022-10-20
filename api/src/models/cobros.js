const mongoose = require("mongoose");

const cobros = mongoose.Schema({
  total: {
    type: String,
  },
  retosSales: [
    {
      type: mongoose.Types.ObjectId,
      ref: "challenges",
    },
  ],
  publicacionesSales: [
    {
      type: mongoose.Types.ObjectId,
      ref: "publication",
    },
  ],
  estado: {
    type: Boolean,
    default: false,
  },
  photographer: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  banco: {
    type: String,
  },
  alias: {
    type: String,
  },
  cbu: {
    type: String,
  },
});

module.exports = mongoose.model("cobros", cobros);
