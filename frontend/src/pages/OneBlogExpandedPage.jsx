import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { ArrowLeftCircleIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { use } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BlogContext } from "../context/BlogContext";

const getBlogPostByIdApi = `${
  import.meta.env.VITE_BACKEND_SERVER_URL
}/blog/get-one-blog_post`;

// This page will display the expanded view of a single blog post
// It will fetch the blog post data based on the blog ID from the URL
// and display the title, content, author, and other details.
const OneBlogExpandedPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogemailId, setBlogEmailId] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogCreatedAt, setBlogCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigate } = useContext(BlogContext);

  // function to fetch the blog post data
  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${getBlogPostByIdApi}/?id=${id}`);
      if (!response) {
        console.log(`error in getting a response from getBlogPostById`);
        toast.error(`Data does not exist in backend`);
        return;
      }
      // Extracting the blog data from the response
      const { title, content, email, image, createdAt } =
        response.data.blogData;
      setBlogTitle(title);
      setBlogContent(content);
      setBlogEmailId(email);
      setBlogImage(image);
      setBlogCreatedAt(createdAt);
    } catch (error) {
      console.log(error);
      toast.error(`Error in fetching blog. Please try again later`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogPost(); // Fetch the blog post data when the component mounts
  }, [id]);
  return (
    <div className="w-full min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="text"
          className="flex items-center gap-2 mb-4 dark:text-white"
          onClick={() => navigate("/blogs")}
        >
          <ArrowLeftCircleIcon strokeWidth={2} className="h-5 w-5" /> Back to
          Blogs
        </Button>

        <Card className="w-full overflow-hidden shadow-xl dark:bg-blue-gray-800">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src={blogImage}
              alt={`Image for ${blogTitle}`}
              className=" w-auto h-auto md:h-96 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/1200x600/cccccc/ffffff?text=Image+Error";
              }}
            />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-2 font-bold dark:text-white"
            >
              {blogTitle}
            </Typography>
            <Typography
              color="gray"
              className="font-normal mb-6 dark:text-blue-gray-300"
            >
              By: {blogemailId} &bull; Published on{" "}
              {new Date(blogCreatedAt).toLocaleDateString()}
            </Typography>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <Typography className="font-normal text-blue-gray-700 dark:text-blue-gray-200">
                {blogContent}
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OneBlogExpandedPage;
