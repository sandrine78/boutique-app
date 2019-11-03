const express = require("express");
const router = express.Router();

const Department = require("../models/department");  // import des modèles
const Product = require("../models/product");
const Category = require("../models/category");

router.post("/department/create", async (req, res) => {
  //   res.json("Department Created");  // on va mettre cette ligne avant de créer code pour voir si tout fonctionne et créer en parallèle dans postman tous les CRUD
  const title = req.body.title;

  // On cherche un produit dans la base de donnee qui a comme nom `title`
  const ifExist = await Department.findOne({ title: title });
  // Si on en trouve un ERROR
  if (ifExist !== null) {
    return res.status(400).send({
      error: {
        message: "Dept already exists"
      }
    });
  }
  // On genere le nouveau produit
  try {
    // On cree un nouveau produit avec le Modele
    const newDepartment = new Department({
      title: title
    });

    // On sauvegarde le nouveau dept pour l'ajouter a la base de donnee
    await newDepartment.save();
    res.status(201).send(newDepartment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// route pour lister les attributs de tous les départements.
router.get("/department", async (req, res) => {
    //res.json({ message: "Departments List" });
    try {
        const Departments = await Department.find();
        res.json(Departments);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

  

router.put("/department/update", async (req, res) => {
    // res.json({ message: "Departments modified" });
const id = req.query.id;
const title = req.body.title;

  try {
    
    const Departments = await Department.findOne({ _id: id });  // ou .findById(id)
    // Si on en trouve un ERROR
    Departments.title = title;
    await Departments.save();
    res.status(201).send(Departments);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
 

router.delete("/department/delete", async (req, res) => {
  //res.json({ message: "Departments deleted" });

  const id = req.body.id;
  try {
    // On supprime le dept qui a pour id `id`
    await Department.findByIdAndRemove(id);
    res.send("Ok");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
