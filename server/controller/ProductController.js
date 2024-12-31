import Product from "../model/ProductModel.js";

import fs from "fs";

export const addProduct = async (req, res) => {
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  }
  const { name, price, category, description } = req.body;
  const product = new Product({
    name,
    price,
    imageUrl,
    category,
    description,
  });
  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }

  if (imageUrl) {
    fs.unlink(imageUrl, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
};

//for geting the product from the database

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//delete product from the database

export const deleteProduct = async (req, res) => {
    const {id}=req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
