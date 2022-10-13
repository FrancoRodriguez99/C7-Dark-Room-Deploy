const express = require("express");
const { buy, checkPurchase } = require("../controllers/mercadopago.controller");

const router = express.Router();

router.post("/buy", buy);
router.get("/checkPurchase/:paymentid", checkPurchase);

module.exports = router;
