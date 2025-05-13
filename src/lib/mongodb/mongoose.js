import mongoose from "mongoose";

let initialize = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);
  if (initialize) {
    console.log("Already connected to mongoDB");
    return;
  }
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sahar-blog",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    initialize = true;
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
