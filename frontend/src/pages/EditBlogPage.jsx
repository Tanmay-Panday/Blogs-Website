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
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const updateblogPostApi = `http://localhost:5000/api/blog/update-one-blog`;
const getBlogPostByIdApi = `http://localhost:5000/api/blog/get-one-blog_post`;

const BlogCreationPage = () => {
  const { id } = useParams();
  const [blogImage, setBlogImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [emailId, setEmailId] = useState("");
  const [prevEmailId, setPrevEmailId] = useState("");
  const { navigate } = useContext(BlogContext);

  console.log("image", blogImage);

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  // get pervious data of the blog to be updated
  const getPreviousBlogData = async () => {
    try {
      const response = await axios.get(`${getBlogPostByIdApi}/?id=${id}`);
      if (!response) {
        log(`error in getting a response from getBlogPostById`);
        toast.error(`Data Does not exists in backend`);
      }
      const { title, content, image, email } = response.data.blogData;
      setBlogTitle(title);
      setBlogContent(content);
      setPrevEmailId(email); // extract email-id from blog-data
      setBlogImage(image);
      toast.success(`previous blog data fetched`);
    } catch (error) {
      console.log(error);
      toast.error(`error in fetching blog. Please try again later`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const token_Decoded = jwtDecode(token);
    setEmailId(token_Decoded.email); // get current email-id from token
    getPreviousBlogData();
  }, []); // get previous blog data when page is loaded

  const validateEmail = () => {
    // check whether current email-id from token is eligible for updating the blog or not
    return emailId === prevEmailId;
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      // if email-id from token is validated for updation
      try {
        const formData = new FormData();

        formData.append("id", id);
        formData.append("title", blogTitle);
        formData.append("content", blogContent);
        formData.append("image", blogImage);
        const response = await axios.post(updateblogPostApi, formData);
        if (!response) {
          console.log(`error in using updateBlogPostApi`);
          toast.error(`Update Api Error. Please try again later`);
        }
        toast.success(`blog updated successfully`);
        navigate(-1);
      } catch (error) {
        console.log(error);
        toast.error(
          `Error occured while blog updation. Please try again later`
        );
      }
    } else {
      toast.error(`invalid user for updating the blog`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black  p-4">
      <Card className="w-full max-w-3xl shadow-lg dark:bg-darkmode-surface-a20">
        <CardHeader
          color="blue"
          className="flex justify-center items-center py-4 dark:bg-darkmode-primary-a0"
        >
          <Typography variant="h5" color="white">
            Edit Your Blog
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleUpdateSubmit}>
            {/* Blog Title */}
            <div>
              <Input
                type="text"
                label="Blog Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className=" dark:text-white"
                required
              />
            </div>

            {/* Blog Content */}
            <div>
              <Textarea
                label="Blog Content"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                className="dark:text-white"
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
                // required
              />
            </div>

            {/* Email id being used */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-blue-gray-100">
                @ email : {prevEmailId}
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
