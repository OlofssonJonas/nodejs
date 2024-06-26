const express = require("express");
const router = express.Router();
const {getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require("../controller/products.controller");

router.get("/products", getProducts);
router.get("/products/:id", getProduct);

router.post("/products", addProduct);
router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

module.exports = router;