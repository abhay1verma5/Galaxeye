const express = require("express");
const router = express.Router();
const tileController = require("../controllers/tileController");

// Route to fetch intersecting tiles
router.post("/intersecting-tiles", tileController.getIntersectingTiles);

// Route to load tiles into the database
router.post("/load-tiles", tileController.loadTiles);

module.exports = router;
