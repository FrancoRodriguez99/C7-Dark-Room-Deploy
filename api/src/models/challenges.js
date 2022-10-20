const mongoose = require("mongoose");

const challengesSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    ends: {
      type: Date,
    },
    price: {
      type: String,
    },
    winner: [
      {
        type: mongoose.Types.ObjectId,
        ref: "publication",
      },
    ],
    cashed_out: {
      type: Boolean,
      default: false,
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "publication",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("challenges", challengesSchema);
