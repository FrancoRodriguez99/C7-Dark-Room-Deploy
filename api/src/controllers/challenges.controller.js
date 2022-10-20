const challenges = require("../models/challenges");

const getAllChallenges = async (req, res) => {
  try {
    const allChallenge = await challenges.find().populate("participants").populate("winner");
    res.json(allChallenge);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getChallengeById = async (req, res) => {
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
    const newChallenge = new challenges({
      ...req.body,
    });
    await newChallenge.save();

    res.status(201).json({ newChallenge, creado: true });
  } catch (error) {
    res.status(400).send({ creado: false });
  }
};

const updateChallengeById = async (req, res) => {
  try {
    const { idChallenge } = req.params;

    await challenges.findByIdAndUpdate({ _id: idChallenge }, req.body);
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
