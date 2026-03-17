const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const productsController = require("../controllers/products.controller");

router.get("/", authMiddleware, productsController.getProducts);
router.post("/", authMiddleware, productsController.createProduct);
router.put("/:id", authMiddleware, productsController.updateProduct);
router.delete("/:id", authMiddleware, productsController.deleteProduct);

module.exports = router;