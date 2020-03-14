const express = require("express");

const productsController = require("../../controllers/v1/products-controller.js");

const router = express.Router();
router.post("/create", productsController.createProduct);
router.get("/get-all", productsController.getProducts);
router.get("/list-user/:id", productsController.getProductsByUser);
router.post("/delete", productsController.deleteProduct);

module.exports = router;