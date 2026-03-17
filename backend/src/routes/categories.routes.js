const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const categoriesController = require("../controllers/categories.controller");

router.get("/", authMiddleware, categoriesController.getCategories);
router.post("/", authMiddleware, categoriesController.createCategory);
router.put("/:id", authMiddleware, categoriesController.updateCategory);
router.delete("/:id", authMiddleware, categoriesController.deleteCategory);

module.exports = router;