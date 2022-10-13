const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
require("dotenv").config();

// MIDDLEWARES
const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://frontendc7-darkroom.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    users: "https://dark-room-api.onrender.com/api/users/allUserDefault",
    photographers:
      "https://dark-room-api.onrender.com/api/users/allUserPhotographer",
    publications: "https://dark-room-api.onrender.com/api/publication",
  });
});

module.exports = app;
