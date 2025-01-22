import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/mongoDB.js";
import blogRouter from "./src/routes/blogRoutes.js";
import connectCloudinary from './src/config/cloudinary.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();
connectCloudinary();

app.get("/", (req, res) => res.json({ message: "connected to api" }));

// Routes
app.use("/api/blog", blogRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running at port number ${port}`);
});
