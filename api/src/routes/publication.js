const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

const {
  allPublications,
  newPublication,
  updatePublicaiton,
  deletePublication,
} = require("../controllers/publication.controller");

router.get("/", allPublications);

router.post("/", newPublication);

router.put("/:id", updatePublicaiton);

router.delete("/:id", deletePublication);

module.exports = router;
