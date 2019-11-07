const express = require("express");
const router = express.Router();

const Department = require("../models/department");  // import des modèles
const Product = require("../models/product");
const Category = require("../models/category");

router.post("/category/create", async (req, res) => {
  //res.json("Category Created");
  const title = req.body.title;
  const description = req.body.description;
  const department = req.body.department;


  // On cherche une category dans la base de donnee qui a comme nom `title`
  const ifExist = await Category.findOne({ title: title });
  // Si on en trouve un ERROR
  if (ifExist !== null) {
    return res.status(400).send({
      error: {
        message: "Cat already exists"
      }
    });
  }

  // On genere la nvelle category
  try {
    // On cree une nvelle category avec le Modele
    const newCategory = new Category({
      title: title,
      description: description,
      department: department

    });

    // On sauvegarde la new category pour l'ajouter a la base de donnee
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/category", async(req, res) => {
    //res.json({ message: "Category List" });
    try {
        // on creeune categorie en remplissant le modele
        const categories = await Category.find().populate("department");
        res.json(categories);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });


router.put("/category/update", async (req, res) => {
    //res.json({ message: "Category modified" });
const id = req.query.id;
const title = req.body.title;
const description = req.body.description;
const department = req.body.department;

  try {
    
    const categories = await Category.findOne({ _id: id });
    // Si on en trouve un ERROR
    categories.title = title;   // pour changer sur postman title 
    categories.description = description;  // pour changer sur postman description
    await categories.save();
    res.status(201).send(categories);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
  

router.delete("/category/delete", async (req, res) => {
    //res.json({ message: "Category deleted" });
    const id = req.query.id;
    try {
      // On supprime le dept qui a pour id `id`
      await Category.findByIdAndRemove(id);
      res.send("Ok");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  

module.exports = router;