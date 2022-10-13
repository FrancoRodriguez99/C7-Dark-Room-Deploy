const express = require("express");
const users = require("./users");
const publication = require("./publication");
const challenge = require("./challenges");
const authUser = require("./authUser");
// const { verifyToken } = require("../middlewares/auth.middleware");
const mercadoPago = require("./mercadopago");
const searchId = require("./searchId");

const router = express.Router();

router.use("/users", users);
router.use("/publication", publication);
router.use("/challenge", challenge);
router.use("/auth", authUser);
router.use("/searchId", searchId);
router.use("/mercadopago", mercadoPago);
module.exports = router;
