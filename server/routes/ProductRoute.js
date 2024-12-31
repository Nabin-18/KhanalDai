import express from "express";
import multer from "multer";
import path from "path";

import { addProduct } from "../controller/ProductController.js";

const Productrouter = express.Router();
//image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
  },
});

const upload = multer({ storage: storage });

Productrouter.post("/add",upload.single("image"), addProduct);

export default Productrouter;
