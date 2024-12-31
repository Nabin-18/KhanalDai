import express from "express";

import { getProducts } from "../controller/ProductController.js";

const getProductrouter = express.Router();

getProductrouter.get("/getproduct", getProducts);

export default getProductrouter;
