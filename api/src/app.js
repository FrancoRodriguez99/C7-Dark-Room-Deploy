const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
require("dotenv").config();

// MIDDLEWARES
const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
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
    users: "http://localhost:9000/api/users/allUserDefault",
    photographers: "http://localhost:9000/api/users/allUserPhotographer",
    publications: "http://localhost:9000/api/publication",
  });
});

module.exports = app;
