const publication = require("../models/publication");
const users = require("../models/users");

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
    return res.status(400).send({ message: error });
  }
};

const newPublication = async (req, res) => {
  try {
    const {
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
      challenge,
    } = req.body;

    console.log(tags);

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
      challenge,
      photographer: userPhoto._id,
    });
    await photo.save();

    userPhoto.publications = userPhoto.publications.concat(photo._id);
    await userPhoto.save();

    return res
      .status(201)
      .send({ message: "Publicacion creada correctamente" });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const updatePublicaiton = async (req, res) => {
  await publication.updateOne({ _id: req.params.id }, req.body);
  res.send("datos actualizados correctamente");
};

const deletePublication = async (req, res) => {
  try {
    if (await publication.findOne({ _id: req.params.id })) {
      await publication.findByIdAndDelete(req.params.id);

      return res
        .status(201)
        .json({ message: "Pulicacion eliminada correctamente" });
    }
    return res
      .status(404)
      .json({ message: "La publicacion que desea eliminar no existe" });
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
