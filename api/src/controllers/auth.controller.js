const userSchema = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CourierClient = require("@trycourier/courier").CourierClient;

// ------ register ------
const singUp = async (req, res) => {
  try {
    const { avatar, name, lastName, email, password, userType } = req.body;

    if (!(await userSchema.findOne({ email: email }))) {
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await userSchema({
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

      const courier = CourierClient({
        authorizationToken: process.env.COURIER_KEY,
      });

      const { requestId } = await courier.send({
        message: {
          to: {
            data: {
              name: "Bienvenido a  Dark-Room",
            },
            email,
          },
          template: "Y85GRZWC594QQNQ1W93ZDWDKDJZZ",
          data: {
            userType:
              userType === "userPhotographer" ? "Fotografo" : "Comprador",
            otherUserType:
              userType === "userPhotographer" ? "Comprador" : "Fotografo",
          },
        },
      });

      return res.status(200).json({ newUser, creado: "true" });
    }

    return res
      .status(404)
      .send({ msg: "El mail ya esta asociado a un Usuario existente" });
  } catch (error) {
    console.error(error);
  }
};

// ------ login ------
const singIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(404).send({ e: "emptyEmail" });
  } else if (!password) {
    return res.status(404).send({ e: "emptyPassword" });
  } else if (email && password) {
    const user = await userSchema.findOne({ email: email });
    if (user) {
      const matchPassword = await userSchema.comparePassword(
        password,
        user.password
      );
      if (matchPassword) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: 86400,
        });

        const cookies = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          //httpOnly: true,
          // secure: true,
          // sameSite: 'lax'
        };

        res.cookie("jwt", token, cookies);

        return res
          .status(200)
          .json({ user: user.email, loged: "true", jwt: token });
      }
      return res.status(404).json({ user: user.email, loged: "falseeeeee" });
    }
    return res
      .status(404)
      .send("Usuario no encontrado, revisar email escrito o registrate");
  }
  return res.status(404).send("no funciono");
};

const logOut = async (req, res) => {
  const token = res.clearCookie("jwt");
  if (!token) {
    return res.status(404).send("No hay token");
  }
  return res.status(200).send("adios");
};

const currentUser = async (req, res) => {
  let token = req.cookies.jwt || req.headers.authentication;

  if (!token)
    return res
      .status(403)
      .json({ message: "No se encontro un token en la cookie" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userLoged = await userSchema.findById(decoded.id);
    if (userLoged) return res.status(200).json({ userLoged, token });

    if (!userLoged)
      return res.status(404).json({ message: "No se encontro al usuario" });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

module.exports = { singUp, singIn, logOut, currentUser };
