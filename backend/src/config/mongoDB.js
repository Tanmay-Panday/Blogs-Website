import mongoose from "mongoose";
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connected to db");
    // console.log(process.env.MONGODB_URI);    
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/blog_platform`)
};

export default connectDB;