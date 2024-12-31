import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
