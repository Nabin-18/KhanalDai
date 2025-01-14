import express from "express";
import { removeFromCart } from "../controller/ProductController.js";

const removeFromCartRouter = express.Router();

removeFromCartRouter.delete("/removefromcart/:id", removeFromCart);

export default removeFromCartRouter;