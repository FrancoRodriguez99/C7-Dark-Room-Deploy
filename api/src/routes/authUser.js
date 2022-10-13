const express = require('express');
const { singIn, singUp, currentUser, logOut } = require('../controllers/auth.controller');
const {verifyToken} = require('../middlewares/auth.middleware')

const router = express.Router();

router.post("/singIn", singIn);
router.post("/singUp", singUp);
router.post("/logOut", verifyToken ,logOut)
router.get("/loged", verifyToken ,currentUser);

module.exports = router;