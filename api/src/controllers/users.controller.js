const user = require("../models/users");
const bcrypt = require("bcrypt");

const allUsers = async (req, res) => {
  try {
    const users = await user.find();
    if (users.length === 0) {
      return res.status(201).json({ message: "aún no hay usuarios" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

const allUsersDefult = async (req, res) => {
  try {
    const usersDefult = await user.find({ userType: "userDefault" });
    if (usersDefult.length === 0) {
      return res.status(201).json({ message: "aún no hay usuarios" });
    }
    res.json(usersDefult);
  } catch (error) {
    console.error(error);
  }
};

const allUserPhotographer = async (req, res) => {
  try {
    const usersDefult = await user
      .find({ userType: "userPhotographer" })
      .populate("publications", {
        _id: 1,
        title: 1,
        url: 1,
      });
    if (usersDefult.length === 0) {
      return res.status(201).json({ message: "aún no hay usuarios" });
    }
    res.json(usersDefult);
  } catch (error) {
    console.error(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { avatar, name, lastName, email, password, userType } = req.body;

    //Validate if password is strong (at least eight characters, one uppercase, one lowercase and one number)
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    //Validation of format email
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return res.status(400).json({
        error: "Formato de email no válido",
      });
    }

    //Validation if there is an email associate a user existent
    if (!(await user.findOne({ email: email }))) {
      const newUser = await user({
        avatar:
          avatar ||
          "https://www.seekpng.com/png/full/847-8474751_download-empty-profile.png",
        name,
        lastName,
        email,
        password: passwordHash,
        userType,
      });
      await newUser.save();
      res.send({
        msg: "Usuario y cuenta creados",
        newUser,
      });
    } else {
      res.send({ msg: "El mail ya esta asociado a un Usuario existente" });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    //Validation if there is an _id associate a user existent
    if (await user.findOne({ _id: req.params.id })) {
      await user.updateOne({ _id: req.params.id }, req.body);
      res.send("datos actualizados correctamente");
    } else {
      res.send({ msg: "El Usuario no existente" });
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    //Validation if there is an _id associate a user existent
    if (await user.findOne({ _id: req.params.id })) {
      await user.findByIdAndDelete(req.params.id);
      res.send("usuario eliminado correctamente");
    } else {
      res.send({ msg: "El Usuario no existente" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  allUsers,
  allUsersDefult,
  allUserPhotographer,
  registerUser,
  updateUser,
  deleteUser,
};
