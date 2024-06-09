const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
});

const productModel = mongoose.model("Products", Schema);
module.exports = productModel;
