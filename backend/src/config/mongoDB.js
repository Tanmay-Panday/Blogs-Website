import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    // Correct way to connect using an srv URI and specifying the database
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'blog_platform'
    });
    
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;