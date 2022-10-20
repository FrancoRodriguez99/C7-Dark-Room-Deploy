const express = require("express");
const { buy, checkPurchase, soldStats, whitdrawFunds, buyFromPhone } = require("../controllers/mercadopago.controller");

const router = express.Router();

router.post("/buy", buy);
router.post("/buyFromPhone", buyFromPhone);
router.get("/checkPurchase/:paymentid", checkPurchase);
router.get("/soldStats/:idUser", soldStats);
router.post("/whitdraw/:idUser", whitdrawFunds);

module.exports = router;
