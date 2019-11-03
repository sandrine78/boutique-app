const express = require("express");
const router = express.Router();

const Department = require("../models/department");  // import des modèles
const Product = require("../models/product");
const Category = require("../models/category");

router.post("/product/create", async (req, res) => {
  res.json("product Created");

router.get("/product", (req, res) => {
    res.json({ message: "product List" });
  });

router.put("/product/update", (req, res) => {
    res.json({ message: "product modified" });
  });

router.delete("/product/delete", (req, res) => {
    res.json({ message: "product deleted" });
  }); 

}); 
module.exports = router;