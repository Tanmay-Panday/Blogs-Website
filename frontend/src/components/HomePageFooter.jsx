import { Typography } from "@material-tailwind/react";
import { WebsiteLogo } from "../assets";

export const HomePageFooter = () => {
  return (
    <footer className="w-full p-2 dark:bg-blue-gray-800 dark:text-blue-gray-100">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 dark:bg-blue-gray-800 text-center md:justify-between">
        <img src={WebsiteLogo} alt="logo-ct" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 ">
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:hover:text-white dark:focus:text-white"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:hover:text-white dark:focus:text-white"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:hover:text-white dark:focus:text-white"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:hover:text-white dark:focus:text-white"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-2 border-blue-gray-50" />
      <Typography className="text-center font-normal">
        &copy; 2025 Blogs World
      </Typography>
    </footer>
  );
};
