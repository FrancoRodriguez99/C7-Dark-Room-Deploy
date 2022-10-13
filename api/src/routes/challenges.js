const express = require("express");
const {
	getAllChallenges,
	createChallenge,
	getChallengeById,
	updateChallengeById,
	deleteChallengeById,
} = require("../controllers/challenges.controller");
const challenges = require("../models/challenges");

const router = express.Router();

router.get("/", getAllChallenges);

router.get("/:idChallenge", getChallengeById);

router.post("/", createChallenge);

router.put("/:idChallenge", updateChallengeById);

router.delete("/:id", deleteChallengeById);

module.exports = router;
