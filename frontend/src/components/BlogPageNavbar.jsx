import React, { useContext, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Search } from "lucide-react";
import {
  ChevronDownIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { BlogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import AuthMenu from "./AuthMenu";

const BlogPageNavbar = ({ searchFilter, setSearchFilter }) => {
  const { lightMode, toggleMode, isSignedIn, signOut, navigate } =
    useContext(BlogContext);

  const [openNav, setOpenNav] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate("/"); // Fixed navigation to UserHomePage
  };

  const profileMenu = (
    <Menu
      open={isProfileMenuOpen}
      handler={setIsProfileMenuOpen}
      placement="bottom-end"
    >
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
        >
          <UserAvatar />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isProfileMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10"
          onClick={handleSignOut}
        >
          <PowerIcon className="h-4 w-4 text-red-500" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
  

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Search Field */}
      <li className="relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-gray-900 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </li>

      {/* Post Button (Only for Signed-In Users) */}
      {isSignedIn && (
        <Button
          variant="text"
          size="sm"
          className="text-black bg-blue-gray-100 dark:text-gray-200 dark:bg-blue-gray-900"
          onClick={() => navigate("/blogWrite")}
        >
          Post
        </Button>
      )}

      {/* Toggle Light/Dark Mode */}
      <Button
        variant="text"
        size="sm"
        className="text-black bg-blue-gray-100 dark:text-gray-200 dark:bg-blue-gray-900"
        onClick={toggleMode}
      >
        {lightMode ? "Dark Mode" : "Light Mode"}
      </Button>
    </ul>
  );

  return (
    <Navbar className="mx-auto px-4 py-2 lg:px-8 lg:py-4 dark:bg-black transition-all duration-500 sticky top-0">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900 dark:text-gray-200">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Blogs World
        </Typography>
        <div className="hidden lg:block">{navList}</div>
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

        {/* {isSignedIn && profileMenu} */}
        <AuthMenu />
      </div>
      <MobileNav open={openNav} className="overflow-scroll">
        <div className="container mx-auto bg-blue-gray-50 dark:bg-blue-gray-900">
          {navList}
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default BlogPageNavbar;
