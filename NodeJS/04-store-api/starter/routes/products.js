const express = require("express");
const router = express.Router();

//importo i controllers
const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

//imposto i controllers sulle routes
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
