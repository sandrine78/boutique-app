const express = require("express");
const router = express.Router();

const Department = require("../models/department"); // import des modèles
const Product = require("../models/product");
const Category = require("../models/category");

router.post("/product/create", async (req, res) => {
  //res.json("product Created");
  // on va mettre cette ligne avant de créer code pour voir si tout fonctionne et créer en parallèle dans postman tous les CRUD
  const title = req.body.title;
  // On cherche un produit dans la base de donnee qui a comme nom `title`
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;

  const ifExist = await Product.findOne({ title: title });
  // Si on en trouve un ERROR

  if (ifExist !== null) {
    return res.status(400).send({
      error: {
        message: "Product already exists"
      }
    });
  }
  // On genere le nouveau produit
  try {
    // On cree un nouveau produit avec le Modele
    const newProduct = new Product({
      title: title,
      description: description,
      price: price,
      category: category
    });

    // On sauvegarde le nouveau produit pour l'ajouter a la base de donnee
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/product", async (req, res) => {
  //res.json({ message: "product List" });

  // const category = req.query.category; // on a recup les params des query
  // const title = req.query.title;
  // const priceMin = req.query.priceMin;
  // const priceMax = req.query.priceMax;

  const { category, title, priceMin, priceMax } = req.query;

  const options = {}; // on a cree un obj qui va contenir les params envoyes

  // pas égale à undefined donc si il y a qqch
  if (title !== undefined) options.title = title; // alors tu vas chcher options et creer une clé en lui donnant nom title

  if (category !== undefined) {
    // ou maniere de faire
    options.category = category;
  }
  if (priceMin !== undefined) {
    options.price = { $gte: priceMin }; // gte = mongoose greater than ou equal
  }
  if (priceMax !== undefined) {
    options.price = { $lte: priceMax }; // lte = mongoose lower than ou equal
  }

  try {
    const Products = await Product.find(options).populate("category"); // on va chcher produit selon conditions que je te passe en param cad options + tout ce qu'il y a dans la category à laquel appartient le produit
    res.json(Products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/product/update", async (req, res) => {
  // res.json({ message: "product modified" });
  const id = req.query.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;

  try {
    const products = await Product.findOne({ _id: id });
    // Si on en trouve un ERROR
    products.id = id;
    products.title = title; // pour changer sur postman title
    products.description = description; // pour changer sur postman description
    products.price = price;
    products.category = category;

    await products.save();
    res.status(201).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/product/delete", async(req, res) => {
//res.json({ message: "product deleted" });
const id = req.query.id;
  try {
    await Product.findByIdAndRemove(id);
    res.send("Ok");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


module.exports = router;
