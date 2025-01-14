import express from "express";
import multer from "multer";
import path from "path";

import { addProduct } from "../controller/ProductController.js";

const Productrouter = express.Router();

Productrouter.post("/add", addProduct);

export default Productrouter;
