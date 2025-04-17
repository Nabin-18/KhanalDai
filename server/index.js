import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import Productrouter from "./routes/ProductRoute.js";
import signUpRouter from "./routes/signUp.js";
import loginRouter from "./routes/login.js";
import getProductrouter from "./routes/getProduct.js";
import deleteProductrouter from "./routes/deleteProduct.js";
import addtoCartRouter from "./routes/addtoCart.js";
import removeFromCartRouter from "./routes/removefromCart.js";
import getCartDataRouter from "./routes/getcartData.js";
import productDisplay from "./routes/productDisplay.js";
import payRouter from "./routes/pay.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
connectDB();

// API Endpoints
app.use("/api/products", Productrouter);
app.use("/api/users", signUpRouter);
app.use("/api/users", loginRouter);
app.use("/api/products", getProductrouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/products", deleteProductrouter);
app.use("/api/products", addtoCartRouter);
app.use("/api/products", removeFromCartRouter);
app.use("/api/products", getCartDataRouter);
app.use("/api/products", productDisplay);
app.use("/api/pay", payRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
