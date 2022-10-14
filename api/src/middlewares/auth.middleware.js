const User = require("../models/users");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.cookies.jwt || req.headers.authentication;

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id);

    // if (user) return res.status(200).json(user);
    if (!user) return res.status(404).json({ message: "No user found" });
    next();
  } catch (error) {
    console.log(token);
    console.log(error);
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports = { verifyToken };
