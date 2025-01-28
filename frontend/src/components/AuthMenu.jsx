import React, { useContext, useState } from "react";
import { Button, Menu, MenuHandler, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import { BlogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const AuthMenu = () => {
  const { isSignedIn, signOut, navigate } = useContext(BlogContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  if (isSignedIn) {
    return (
      <Menu open={isProfileMenuOpen} handler={setIsProfileMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button variant="text" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5">
            <UserAvatar />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          <Link to="/profile">
            <MenuItem className="flex items-center gap-2">
              <Typography as="span" variant="small" className="font-normal">
                Profile
              </Typography>
            </MenuItem>
          </Link>
          <MenuItem className="flex items-center gap-2 hover:bg-red-500/10" onClick={handleSignOut}>
            <PowerIcon className="h-4 w-4 text-red-500" />
            <Typography as="span" variant="small" color="red">
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <div className="flex items-center gap-x-1">
      <Button variant="text" size="sm" className="text-black bg-blue-gray-100" onClick={() => navigate("/signup")}>
        Sign Up
      </Button>
      <Button variant="text" size="sm" className="text-black bg-blue-gray-100" onClick={() => navigate("/signin")}>
        Sign In
      </Button>
    </div>
  );
};

export default AuthMenu;
