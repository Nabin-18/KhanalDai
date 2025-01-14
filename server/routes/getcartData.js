import express from 'express';
import { getCartData } from '../controller/ProductController.js';

const getCartDataRouter = express.Router();

getCartDataRouter.get('/getcartdata/:id', getCartData);

export default getCartDataRouter;