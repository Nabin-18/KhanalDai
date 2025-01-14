import Product from "../model/ProductModel.js";
import User from "../model/userModel.js";

export const addProduct = async (req, res) => {
  const { name, price, category, description, image, quantity } = req.body;

  console.log({ name, price, category, description, image, quantity });
  const product = new Product({
    name,
    price,
    quantity,
    imageUrl: image,
    category,
    description,
  });
  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
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
  const productId = req.params.id;
  try {
    const product = await Product.findOneAndDelete(productId);
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

//addto cart function

export const addToCart = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId).select(
    "name price imageUrl category description"
  );
  if (product) {
    res.json(product);
    console.log("My products",product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

//remove from the cart

export const removeFromCart = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId).select(
    "name price imageUrl category description"
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

//getcartdata from the 

export const getCartData = async (req, res) => {
  const productId = req.params.id;
  const product = await Product
    .findById(productId)
    .select("name price imageUrl category description");
  if (product) {
    res.json(product);
  }
  else {
    res.status(404).json({ message: "Product not found" });
  }
}



//productdisplay

export const productDisplay = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId).select(
    "name price imageUrl category description"
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
