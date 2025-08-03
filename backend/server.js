import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/mongoDB.js";
import blogRouter from "./src/routes/blogRoutes.js";
import connectCloudinary from "./src/config/cloudinary.js";
import userRouter from "./src/routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CORS Configuration ---
// This is the new section you need to add/modify.
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();
connectCloudinary();

app.get("/", (req, res) => res.json({ message: "connected to api" }));

// Routes
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running at port number ${port}`);
});
