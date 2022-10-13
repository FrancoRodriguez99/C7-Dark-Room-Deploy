const challenges = require("../models/challenges");

const getAllChallenges = async (req, res) => {
	try {
		const allChallenge = await challenges.find();
		res.json(allChallenge);
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const getChallengeById = async (req, res) => {
	console.log(req.params);
	const { idChallenge } = req.params;
	try {
		const challenge = await challenges.findById(idChallenge);
		res.status(200).json(challenge);
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const createChallenge = async (req, res) => {
	try {
		const { title, descripton, active, participants } = req.body;

		const newChallenge = new challenges({ title, descripton, active, participants });
		const challengeSave = await newChallenge.save();

		res.status(201).json("Challenge Creado correctamente");
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const updateChallengeById = async (req, res) => {
	try {
		const { idChallenge } = req.params;

		console.log(req.body);
		await challenges.findByIdAndUpdate({ _id: idChallenge }, req.body, { new: true });
		res.send("datos actualizados correctamente");
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const deleteChallengeById = async (req, res) => {
	try {
		await challenges.findByIdAndDelete(req.params.id);
		res.send("Pulicacion eliminada correctamente");
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

module.exports = {
	getAllChallenges,
	getChallengeById,
	createChallenge,
	updateChallengeById,
	deleteChallengeById,
};
