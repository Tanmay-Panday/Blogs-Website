import mongoose from "mongoose";
const blogPostSchema = new mongoose.Schema({
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
});

const blogPostModel =
  mongoose.models.blog_post || mongoose.model("blog_post", blogPostSchema);

export default blogPostModel;
