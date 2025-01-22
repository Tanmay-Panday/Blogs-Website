import express from "express";
import {
  createBlog,
  deleteOneBlog,
  getAllBlogs,
  getOneBlog,
} from "../controllers/blogController.js";
import uploadMiddleware from "../middleware/multer.js";

const blogRouter = express.Router();

// API ENDPOINTS

blogRouter.post("/add-blog_post", uploadMiddleware.single("image"), createBlog);
// to create and upload a blog_post
// and use a single uploadMiddleware (multer middleware) to upload the "image" of the blogPostModel Schema
// Image from form -> multer(used by cloudinary to upload image to cloudinary and get url) -> image url 

blogRouter.get("/get-blog_posts", getAllBlogs); // to get data of all blogs_posts
blogRouter.get("/get-one-blog_post", getOneBlog); // to get a single blog from blogs
blogRouter.delete("/delete-blog_post", deleteOneBlog); // to delete a blog_post of specified id

export default blogRouter;
