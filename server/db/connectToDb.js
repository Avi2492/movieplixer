import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars.js";

export const connectToDb = async () => {
  try {
    const response = await mongoose.connect(ENV_VARS.MONGO_URI);

    console.log("DB connected: " + response.connection.host);
  } catch (error) {
    console.error("Error in connecting DB" + error.message);
    process.exit(1);
  }
};
