import React, { useState, useRef } from "react";
import DisplayAllBlogs from "../components/DisplayAllBlogs";
import BlogPageNavbar from "../components/BlogPageNavbar";

const BlogsPage = () => {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="w-full min-h-screen bg-white dark:bg-blue-gray-900">
      {/* BlogPage Navbar */}
      <BlogPageNavbar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Latest Blogs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">Latest Blogs</h2>
          <DisplayAllBlogs searchFilter={searchFilter} />
        </section>
      </main>
    </div>
  );
};

export default BlogsPage;
