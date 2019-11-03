const express = require("express");
const bodyParser = require("body-parser"); // il recup tout du post
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/boutique-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const deptRoute = require("./routes/department"); // definir routes
app.use(deptRoute);
const catRoute = require("./routes/category");
app.use(catRoute);
const prodRoute = require("./routes/product");
app.use(prodRoute);

const boutique = [];

app.listen(3000, () => {
  console.log("Server started");
});
