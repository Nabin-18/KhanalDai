import express from "express";
import { signUp } from "../controller/userController.js";


const signUpRouter = express.Router();

signUpRouter.post("/signup", signUp);

export default signUpRouter;
