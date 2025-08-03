import React, { useEffect, useState } from "react";
import axios from "axios";

const getAllBlogsApi = `${import.meta.env.VITE_BACKEND_SERVER_URL}/blog/get-blog_posts`;

const DisplayAllBlogs = ({ searchFilter }) => {
  const [allBlogsArray, setAllBlogsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(getAllBlogsApi);
      setAllBlogsArray(response.data.blogsArray);
    } catch (error) {
      console.error(`Error fetching blogs:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const filteredBlogs = allBlogsArray.filter((blog) =>
    blog.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map(({ _id, title, email, image, content }) => (
          <div
            key={_id}
            className="bg-white border rounded-lg overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:bg-blue-gray-700"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 dark:text-white">{title}</h3>
              <p className="text-gray-600 dark:text-white">{content.substring(0, 100)}...</p>
              <h4 className="text-sm text-gray-500 mt-2 dark:text-blue-gray-300">By: {email}</h4>
            </div>
          </div>
        ))
      ) : (
        <div>No blogs match your search criteria.</div>
      )}
    </div>
  );
};

export default DisplayAllBlogs;
