import express from "express";

import { deleteProduct } from "../controller/ProductController.js";

const deleteProductrouter = express.Router();

deleteProductrouter.delete("/deleteproduct/:id", deleteProduct);

export default deleteProductrouter;