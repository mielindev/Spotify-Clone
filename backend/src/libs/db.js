import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOBD_URI);
    console.log("Connected to MongoDB", connection.connection.host);
  } catch (error) {
    process.exit(1);
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectToDB;
