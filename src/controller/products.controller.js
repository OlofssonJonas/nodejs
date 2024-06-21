const productModel = require("../models/product.model");

const getProducts = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findOne({ _id: id });
  if(!product) {
    res.status(400).json({message: 'Id not found'});
  }
  res.status(200).json(product);
};

const addProduct = async (req, res) => {
  console.log(req.body);
  const product = await productModel.create(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const updatedProduct = await productModel.findByIdAndUpdate( id , {...req.body}, {new: true});
  res.status(200).json(updatedProduct);
};

const deleteProduct = async(req, res) => {
    const id = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    res.status(200).json({message: `Product with id ${id} is deleted, {deletedProduct}`})
}

module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
