import mongoose from "mongoose";
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    }, // blog title
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "blog_posts", // name of the collection in MongoDB
  }
);

const blogPostModel =
  mongoose.models.blog_post || mongoose.model("blog_posts", blogPostSchema);

export default blogPostModel;
