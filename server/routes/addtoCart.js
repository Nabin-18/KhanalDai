import express from 'express';
import { addToCart } from '../controller/ProductController.js';

const addtoCartRouter = express.Router();

addtoCartRouter.post('/addtocart/:id', addToCart);

export default addtoCartRouter;

