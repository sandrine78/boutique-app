const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
    },
    price: {
        type: Number,
        default: 0,
        min: [0, "Should not be negative"]
      },
    category: {
        type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
      }
  });

  module.exports = Product;
