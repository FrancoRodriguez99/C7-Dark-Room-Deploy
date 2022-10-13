const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = mongoose.Schema(
  {
    image: {
      type: String,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
      default: "Desconocido",
    },
    lastName: {
      type: String,
      default: "Desconocido",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    followed: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "publication",
      },
    ],
    liked: [
      {
        type: mongoose.Types.ObjectId,
        ref: "publication",
      },
    ],
    publications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "publication",
      },
    ],
    userType: {
      type: String,
      default: "userDefault",
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

user.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

user.statics.comparePassword = async (password, recivePassword) => {
  return await bcrypt.compare(password, recivePassword);
};

module.exports = mongoose.model("user", user);
