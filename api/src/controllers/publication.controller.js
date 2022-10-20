const publication = require("../models/publication");
const users = require("../models/users");
const challenges = require("../models/challenges");

const allPublications = async (req, res) => {
  try {
    const photo = await publication.find().populate("photographer", {
      _id: 1,
      name: 1,
      lastName: 1,
      avatar: 1,
    });
    if (photo.length === 0) {
      return res.status(201).send({ message: "No hay publicaciones creadas" });
    }
    return res.status(201).json(photo);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
};

const newPublication = async (req, res) => {
  try {
    const { title, ubication, tags, description, url, likes, downloads, price, pay, photographer, challenge } = req.body;

    const userPhoto = await users.findById(photographer);

    const photo = await publication({
      title,
      ubication,
      tags,
      description,
      url,
      likes,
      downloads,
      price,
      pay,
      photographer,
      challenge: challenge ? challenge : null,
      photographer: userPhoto._id,
    });

    await photo.save();
    if (challenge) {
      const findChallenge = await challenges.findById(challenge);
      findChallenge.participants = findChallenge.participants.concat(photo._id);
      const a = await findChallenge.save();
    }
    userPhoto.publications = userPhoto.publications.concat(photo._id);
    await userPhoto.save();

    return res.status(201).send({ message: "Publicacion creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
};

const updatePublicaiton = async (req, res) => {
  if (req.body.likes) {
    const publicacion = await publication.findOne({ _id: req.params.id }).populate("challenge");
    if (publicacion.challenge) {
      if (new Date(publicacion.challenge.ends) > new Date(Date.now())) {
        await publication.updateOne({ _id: req.params.id }, { challengeLikes: req.body.likes });
      }
    }
  }

  await publication.updateOne({ _id: req.params.id }, req.body);

  res.send("datos actualizados correctamente");
};

const deletePublication = async (req, res) => {
  try {
    if (await publication.findOne({ _id: req.params.id })) {
      await publication.findByIdAndDelete(req.params.id);

      return res.status(201).json({ message: "Pulicacion eliminada correctamente" });
    }
    return res.status(404).json({ message: "La publicacion que desea eliminar no existe" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = {
  allPublications,
  newPublication,
  updatePublicaiton,
  deletePublication,
};
