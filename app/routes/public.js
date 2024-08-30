const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/Home.controller");
const SymbolController = require("../controllers/Symbol.controller");

router.get("/", HomeController.renderHome);
router.get("/migrate", HomeController.initialMigrate);

router.post("/symbol/add-to-favorite", SymbolController.addToFavorite);

module.exports = router;
