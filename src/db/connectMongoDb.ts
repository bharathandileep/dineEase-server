import mongoose from "mongoose";
import { mongoURI } from "../config/environment";

//Establishes a connection to the MongoDB database using Mongoose.
export const connectToMongoDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(mongoURI);
    console.log(`MongoDB connection successful: ${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
