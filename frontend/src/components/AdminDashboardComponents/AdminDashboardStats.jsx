import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboardStats = ({ numberOfBlogs }) => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfAdmins, setNumberOfAdmins] = useState(0);

  const getNumberOfUsersAndAdminsApi = `${import.meta.env.VITE_BACKEND_SERVER_URL}/user/get-number-of-users`;

  const getNumberOfUsersAndAdmins = async () => {
    const response = await axios.get(getNumberOfUsersAndAdminsApi);
    if (!response) {
      toast.error(`error while fetching number of users and admins`);
    }
    setNumberOfUsers(response.data.users);
    setNumberOfAdmins(response.data.admins);
  };

  useEffect(() => {
    getNumberOfUsersAndAdmins();
  }, []);

  return (
    <section className="container grid gap-10 px-8 py-8 mx-auto lg:grid-cols-1 lg:gap-20 lg:py-44 xl:grid-cols-2 xl:place-items-center">
      <div>
        <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-500 mb-1 font-extrabold uppercase">
          blogs world
        </h6>
        <h1 className="block antialiased tracking-normal font-sans text-blue-gray-900 text-3xl !leading-snug lg:text-5xl font-light">
          Stats Section
        </h1>
        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mt-3 w-full !text-gray-500 lg:w-10/12">
          Check out some interesting statistics about our blog world.
        </p>
      </div>
      <div>
        <div className="grid sm:grid-cols-2 grid-cols-1   gap-8 gap-x-28">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none">
            <p className="block antialiased font-sans text-blue-500 text-7xl font-extralight mt-3">
              <CountUp end={numberOfUsers} />
            </p>
            <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 mt-1 font-bold">
              Users
            </h6>
            <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 mt-1 font-normal ">
              Satisfied Bloggers reading and posting blogs.
            </h6>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none">
            <p className="block antialiased font-sans text-blue-500 text-7xl font-extralight mt-3">
              <CountUp end={numberOfAdmins} />
            </p>
            <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 mt-1 font-bold">
              Admins
            </h6>
            <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 mt-1 font-normal ">
              Admins who are gracefully resolving all kinds of issues
            </h6>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none">
            <p className="block antialiased font-sans text-blue-500 text-7xl font-extralight mt-3">
              <CountUp end={numberOfBlogs} />
            </p>
            <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 mt-1 font-bold">
              Blog Posts
            </h6>
            <h6 className="block antialiased tracking-normal font-sans text-base leading-relaxed text-blue-gray-900 mt-1 font-normal ">
              Blogs of different topics posted till date.
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardStats;
