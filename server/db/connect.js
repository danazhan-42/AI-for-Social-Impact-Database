import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("Attempting to connect to Database...");
    await mongoose.connect(process.env.MONGO_URI, {});
  } catch (error) {
    console.log("Failed to connect to Database!", error.message);
  }
};

export default connect;
