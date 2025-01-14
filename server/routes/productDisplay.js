import express from "express";

import { productDisplay as getProduct } from "../controller/ProductController.js";

const productDisplay = express.Router();

productDisplay.get("/productdisplay/:id", getProduct);

export default productDisplay;
