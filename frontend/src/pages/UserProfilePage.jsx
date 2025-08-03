import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  IconButton,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { BlogContext } from "../context/BlogContext";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const { user, navigate } = useContext(BlogContext); // Get user from context
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email;

  // API Endpoints
  const getUserApi = "http://localhost:5000/api/user/get-user-by-email";
  const getUserBlogsApi = "http://localhost:5000/api/blog/get-blogs-by-email";
  const deleteBlogByIdApi = "http://localhost:5000/api/blog/delete-blog_post";

  // a function to make sure that user can only delete his/her own blog and also give admin rights to delete any blog
  //@working: decodes local storage token to get user-email and then returns true if( blog_email === decodedToken.email  OR (email credentails aquired from decoded local-storage-token is admin)
  const validateDeleterEmail = (blog_emailId) => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    let validity = false;
    if (decodedToken.email === blog_emailId) {
      validity = true;
    } else {
      validity = userData ? userData.admin : false;
    }
    return validity;
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.post(getUserApi, { email: userEmail });
      if (response.data.credentials) {
        setUserData(response.data.credentials);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserBlogs = async () => {
    try {
      const response = await axios.post(
        getUserBlogsApi,
        { email: userEmail },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setBlogs(response.data.blogsArray || []);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Data
  useEffect(() => {
    if (userEmail) {
      fetchUserData();
      fetchUserBlogs();
    }
  }, [userEmail]);

  // delete a blog by it's _id
  const handleBlogDelete = async (blog_id, blog_email) => {
    if (validateDeleterEmail(blog_email)) {
      // check whether deleter is valid or not from token

      try {
        const response = await axios.delete(
          `${deleteBlogByIdApi}/?id=${blog_id}`
        );
        if (!response) {
          toast.error(`Error in calling delete-blog_post api`);
        }
        toast.success(`blog successfully deleted`);
        fetchUserData();
        fetchUserBlogs();
      } catch (error) {
        console.log(error);
        toast.error(`Some error occured.Please try again later.`);
      }
    } else {
      toast.error(`User not verified for deletion`);
    }
  };

  return (
    <section className="p-8 dark:bg-darkmode-surface-a0 h-full min-h-screen bg-white">
      <div className="max-w-4xl mx-auto h-full ">
        {/* User Profile Card */}
        <Card className="p-6 bg-white shadow-lg dark:bg-darkmode-surface-a10">
          <CardBody>
            {loading ? (
              <div className="flex justify-center">
                <Spinner color="blue" />
              </div>
            ) : userData ? (
              <div className="flex flex-wrap justify-between">
                <div>
                  <Typography variant="h4" className="dark:text-white">
                    {`Username : ${userData.name}`}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-gray-600 dark:text-blue-gray-200"
                  >
                    {`Email Id : ${userEmail}`}
                  </Typography>
                  {userData.admin && (
                    <Typography
                      variant="small"
                      className="text-red-500 font-bold"
                    >
                      (Admin)
                    </Typography>
                  )}
                </div>
                <div>
                  {userData.admin && (
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/admin-dashboard`)}
                    >
                      Dashboard
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <Typography variant="small" color="red">
                Error loading user data.
              </Typography>
            )}
          </CardBody>
        </Card>
        {/* User Blogs Section */}
        <div className="mt-8  ">
          <Typography variant="h5" className="mb-4 dark:text-blue-gray-100">
            Your Blog Posts
          </Typography>
          {loading ? (
            <div className="flex justify-center">
              <Spinner color="blue" />
            </div>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <Card
                key={blog._id}
                className="mb-4 p-4 bg-white shadow-md dark:bg-blue-gray-800 "
              >
                <CardBody>
                  <div className=" flex justify-between">
                    <div role="blog-content">
                      <Typography
                        variant="h6"
                        className="dark:text-blue-gray-100"
                      >
                        {blog.title}
                      </Typography>
                      <Typography className="text-gray-600 dark:text-blue-gray-200">
                        {blog.content.slice(0, 100)}...
                      </Typography>
                    </div>
                    <div
                      role="blog-updaters"
                      className="flex flex-col dark:invert"
                    >
                      {" "}
                      <IconButton
                        variant="text"
                        onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </IconButton>
                      <IconButton
                        variant="text"
                        onClick={() => {
                          handleBlogDelete(blog._id, blog.email);
                        }}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </IconButton>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <Typography className="text-gray-600 dark:text-blue-gray-200">
              The blogs posted by you appear here.
            </Typography>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
