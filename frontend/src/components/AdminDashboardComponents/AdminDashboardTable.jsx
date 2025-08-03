import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Title", "Email", "Created At", "Updated At", "Actions"];
const ITEMS_PER_PAGE = 5;

const AdminDashboardTable = ({
  allBlogsArray,
  setAllBlogsArray,
  isTableLoading,
  setIsTableLoading,
  searchFilter,
  isDateSearchFilterSelected,
  dateSearchFilter,
  setNumberOfBlogs,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getAllBlogsApi = `${import.meta.env.VITE_BACKEND_SERVER_URL}/blog/get-blog_posts`;

  const fetchAllBlogs = async () => {
    try {
      setIsTableLoading(true);
      const response = await axios.get(getAllBlogsApi);
      if (!response) {
        toast.error(
          "Error Occurred while fetching blogs. Please try again later"
        );
      }
      let blogs = response.data.blogsArray;
      setNumberOfBlogs(blogs.length);

      if (searchFilter) {
        blogs = blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            blog.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
            blog._id.toLowerCase().includes(searchFilter.toLowerCase())
        );
      }
      if (isDateSearchFilterSelected && dateSearchFilter) {
        blogs = blogs.filter((blog) => {
          const blogDate = new Date(blog.createdAt).toISOString().split("T")[0];
          const selectedDate = new Date(dateSearchFilter)
            .toISOString()
            .split("T")[0];
          return blogDate === selectedDate;
        });
      }
      setAllBlogsArray(blogs);
    } catch (error) {
      toast.error("Some error occurred. Please try again later");
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, [searchFilter, dateSearchFilter]);

  const onDeleteHandle = async (blog_id, blog_email) => {
    
  };

  const totalPages = Math.ceil(allBlogsArray.length / ITEMS_PER_PAGE);
  const displayedBlogs = allBlogsArray.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card className="h-full w-full  ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Blog Posts
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage all blog posts in the system
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedBlogs.map(
              ({ _id, title, email, createdAt, updatedAt }, index) => {
                return (
                  <tr key={_id} className="hover:bg-blue-gray-50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {new Date(createdAt).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {new Date(updatedAt).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Tooltip content="Delete Blog">
                          <IconButton
                            variant="text"
                            onClick={() => onDeleteHandle(_id, email)}
                          >
                            <TrashIcon className="h-4 w-4 text-red-600" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Typography variant="small" color="blue-gray">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminDashboardTable;
