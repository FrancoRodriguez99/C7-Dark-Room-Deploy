const user = require("../models/users");
const publication = require("../models/publication");

const userForId = async (req, res) => {
  try {
    const userId = await user.findById(req.params.id).populate("publications").populate("favorites").populate("liked");
    if (!userId || userId.length === 0) {
      return res.status(201).json({ message: "Usuario no encontrado" });
    }
    res.json(userId);
  } catch (error) {
    console.error(error);
  }
};

const publicationForId = async (req, res) => {
  try {
    const publicationId = await publication.findById(req.params.id).populate("photographer");
    if (!publicationId || publicationId.length === 0) {
      return res.status(201).json({ message: "Publicación no encontrada" });
    }
    console.log(publicationId);
    res.json(publicationId);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { userForId, publicationForId };
