import React, { useContext, useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { PencilIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BlogContext } from "../context/BlogContext";

const blogPostApi = `http://localhost:5000/api/blog/add-blog_post`;

const BlogCreationPage = () => {
  const [blogImage, setBlogImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [emailId, setEmailId] = useState("");
  const { navigate } = useContext(BlogContext);

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("content", blogContent);
      formData.append("image", blogImage);
      formData.append("email", emailId);

      const response = await axios.post(
        "http://localhost:5000/api/blog/add-blog_post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );

      if (!response) {
        console.log(`error in calling api`);
      }
      console.log(`blog posted on backend successfully`);
      navigate(`/blogs`);
    } catch (error) {
      console.log(error);
    }
  };

  // get email id from decoded token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const token_Decoded = jwtDecode(token);
    setEmailId(token_Decoded.email);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black  p-4">
      <Card className="w-full max-w-3xl shadow-lg dark:bg-darkmode-surface-a10">
        <CardHeader
          color="blue"
          className="flex justify-center items-center py-4 dark:bg-darkmode-primary-a0"
        >
          <Typography variant="h5" color="white">
            Create Your Blog
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Blog Title */}
            <div>
              <Input
                type="text"
                label="Blog Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className=" dark:"
                required
              />
            </div>

            {/* Blog Content */}
            <div>
              <Textarea
                label="Blog Content"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                required
              />
            </div>

            {/* Blog Thumbnail */}
            <div className="max-w-40 border-dashed border-2 border-gray-400 rounded-md">
              <label
                htmlFor="blogThumbnail"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-blue-gray-100"
              >
                Blog Thumbnail
                {blogImage ? (
                  <img
                    src={
                      typeof blogImage === "string"
                        ? blogImage
                        : URL.createObjectURL(blogImage)
                    }
                    alt=""
                    className="w-[150px] h-[70px] object-contain"
                  />
                ) : (
                  <PhotoIcon className="w-[150px] h-[70px] object-contain" />
                )}
              </label>
              <input
                type="file"
                id="blogThumbnail"
                hidden
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageChange}
                className=" dark:bg-darkmode-surface-a10 dark:text-blue-gray-100"
                required
              />
            </div>

            {/* Email id being used */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-blue-gray-100">
                @ email : {emailId}
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                ripple={true}
                className=" bg-blue-300 dark:bg-darkmode-primary-a0"
              >
                Post Blog
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BlogCreationPage;
