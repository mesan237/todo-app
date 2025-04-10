import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI || "";
const connectdb = async () => {
  // console.log("uri", uri);
  try {
    const con = await mongoose.connect(uri);
    console.log("connected ...");
  } catch (error) {
    console.log(error, uri);
    process.exit(-1);
  }
};

export default connectdb;
