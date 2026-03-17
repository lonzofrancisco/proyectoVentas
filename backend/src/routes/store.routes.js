const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

router.get("/:slug", storeController.getStore);

module.exports = router;