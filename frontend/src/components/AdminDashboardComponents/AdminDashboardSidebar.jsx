import React, { useContext, useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  PresentationChartBarIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { BlogContext } from "../../context/BlogContext";

const AdminDashboardSidebar = () => {
  const { lightMode, toggleMode, navigate, signOut } = useContext(BlogContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 pl-2 stroke-2" />
        )}
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="p-4  dark:bg-darkmode-surface-a0 "
      >
        <Card color="transparent" shadow={false} className="h-full w-full p-4">
          <Typography
            variant="h5"
            className="mb-4 text-blue-gray-900 dark:text-white"
          >
            Admin Panel
          </Typography>
          <List>
            <ListItem
              className="dark:text-white dark:hover:bg-blue-gray-900"
              onClick={() => navigate("/")}
            >
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5 dark:invert-0" />
              </ListItemPrefix>
              Homepage
            </ListItem>
            <ListItem
              onClick={toggleMode}
              className="cursor-pointer dark:text-white dark:hover:bg-blue-gray-900"
            >
              <ListItemPrefix>
                {!lightMode ? (
                  <SunIcon className="h-5 w-5 dark:invert-0" />
                ) : (
                  <MoonIcon className="h-5 w-5 dark:invert-0" />
                )}
              </ListItemPrefix>
              Toggle Mode
            </ListItem>
            <ListItem
              className="dark:text-white dark:hover:bg-blue-gray-900"
              onClick={() => signOut()}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 dark:invert-0" />
              </ListItemPrefix>
              Sign Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
};

export default AdminDashboardSidebar;
