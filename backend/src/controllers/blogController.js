import blogPostModel from "../models/blogPostModel.js";
import { v2 as cloudinary } from "cloudinary";
import upload from "../middleware/multer.js";

//@description to create a blog consisting of title,content,image.
//@type POST request
//@route /api/blog/add-blog_post
export const createBlog = async (req, res) => {
  const { title, content } = req.body; // aquire blog title
  const imageFile = req.file; // aquire image from form

  if (!title || !content) {
    // to check if either blog title or blog content are not present
    return res.status(400).json({ message: "Invalid blog credentials" });
  }
  try {
    let imageUrl = ""; // to get image url from cloudinary to be used in mongodb
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: process.env.CLOUDINARY_BLOG_IMAGES_FOLDER
      }); // upload image to cloudinary database with the help of multer to get url which can be used in mongodb
      imageUrl = imageUpload.secure_url; // extract the url from imageUpload object to be used in mongodb
    } else {
      return res
        .status(400)
        .json({ message: "Error in fetching Blog Image from client side" });
    }
    const blogData = {
      title,
      content,
      image: imageUrl,
    };

    const blog = blogPostModel(blogData);
    await blog.save(); // upload a blog in database

    res.status(200).json({ message: "Blog Successfully Posted" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "An error Occured while posting the blog" });
  }
};

//@description to get all blogs .
//@type GET request
//@route /api/blog/get-blog_posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogsArray = await blogPostModel.find(); // get array of all blogs in database

    res.status(200).json({ message: "Blogs have been fetched", blogsArray });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "An Error Occured while getting all blogs" });
  }
};

//@description to get a blog by its _id
//@type GET  request
//@route /api/blog/get-one-blog_post
export const getOneBlog = async (req, res) => {
  const { id } = req.query; // acquire blog id from req query

  if (!id) {
    return res.status(400).json({ message: "Blog Object id is not specified" });
  }

  try {
    const blogData = await blogPostModel.findById(id);
    if (!blogData) {
      return res.status(400).json({ message: "Blog not found" });
    }
    res
      .status(200)
      .json({ message: `Blog of id = ${id} successfully fetched`, blogData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An Error occured while getting a blog" });
  }
};

//@description to delete a blog by its _id
//@type DELETE  request
//@route /api/blog/delete-blog_post
export const deleteOneBlog = async (req, res) => {
  const { id } = req.query; // acquire blog id from req query

  if (!id) {
    return res
      .status(400)
      .json({ message: "Blog Object id for deletion is not specified" });
  }

  try {
    const blogDeleted = await blogPostModel.findByIdAndDelete(id); // delete a blog_post by its object id from mongodb
    if (!blogDeleted) {
      return res.status(400).json({ message: "Blog not found" });
    }
    
    // now delete image from cloudinary database
    const publicImageId = blogDeleted.image.split("/").pop().split(".")[0]; // extracting the cloudinary public id of the image url from deleted blog object and use it for getting public url of image i.e. CLOUDINARY_BLOG_IMAGES_FOLDER + publicImageId
    
    const cloudinaryImageDeleted = await cloudinary.uploader.destroy(
      `${process.env.CLOUDINARY_BLOG_IMAGES_FOLDER}/${publicImageId}`
    ); // await deletion of that image 
    if (cloudinaryImageDeleted.result !== "ok") {
      console.log(
        `Error in deleting cloudinary image ${cloudinaryImageDeleted.error}`
      );
    }
    res.status(200).json({ message: "Blog successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An Error occured while deleting blog" });
  }
};
