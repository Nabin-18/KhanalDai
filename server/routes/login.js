import express from "express";
import { login } from "../controller/userController.js";
 

const loginRouter = express.Router();
loginRouter.post('/login',login);

export default loginRouter;