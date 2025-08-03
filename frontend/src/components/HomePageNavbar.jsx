import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

import { HomeNavbarIcons } from "../assets";
import { BlogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";
import AuthMenu from "./AuthMenu";

const HompPageNavbar = () => {
  const { lightMode, toggleMode, isSignedIn, navigate } =
    useContext(BlogContext);

  const signInHandler = () => navigate("/signin");
  const signUpHandler = () => navigate("/signup");

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <img
          src={HomeNavbarIcons.blogsIcon}
          alt=""
          className={`w-5 h-5 ${lightMode ? "invert-0" : " invert"}`}
        />
        <Link to="/blogs" className="flex items-center">
          Blogs
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <img
          src={HomeNavbarIcons.postIcon}
          alt=""
          className={`w-5 h-5 ${lightMode ? "invert-0" : " invert"}`}
        />
        <Link
          to={isSignedIn ? "/blogWrite" : "/signin"}
          className="flex items-center"
        >
          Post
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <img
          src={HomeNavbarIcons.aboutIcon}
          alt=""
          className={`w-5 h-5 ${lightMode ? "invert-0" : " invert"}`}
        />
        <Link to="/about" className="flex items-center">
          About
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <img
          src={
            lightMode
              ? HomeNavbarIcons.lightModeIcon
              : HomeNavbarIcons.darkModeIcon
          }
          alt=""
          className={`w-5 h-5 ${lightMode ? "invert-0" : " invert"}`}
        />
        <button
          onClick={toggleMode}
          className="flex items-center dark:text-gray-200"
        >
          Toggle Mode
        </button>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 dark:bg-black transition-all duration-500">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900 dark:text-gray-200">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium "
        >
          BlogsWorld
        </Typography>
        <div className="hidden lg:block dark:text-gray-200">{navList}</div>
        <AuthMenu />
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto bg-blue-gray-50 dark:bg-blue-gray-900">
          <div className="text-blue-gray-900 dark:text-gray-200">{navList}</div>
        </div>
      </MobileNav>
    </Navbar>
  );
};
export default HompPageNavbar;
