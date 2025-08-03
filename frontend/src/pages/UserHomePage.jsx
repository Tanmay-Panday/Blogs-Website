import React from "react";
import HomePageNavbar from "../components/HomePageNavbar";
import { HomePageFooter } from "../components/HomePageFooter";
import { Typewriter } from "react-simple-typewriter";
import { HomePageBackgroundFeatherIcon } from "../assets";

const UserHomePage = () => {
  return (
    <div className="WholeWebsite dark:bg-black flex flex-col min-h-screen">
      {/* header section */}
      <header className="HeaderSection">
        <HomePageNavbar login={false} />
      </header>

      {/* content section */}
      <main className="ContentSection flex-grow flex items-center justify-center bg-gray-400 dark:bg-blue-gray-900 p-4">
        {/* Background Feather Icon for Large Screens */}
        <img
          src={HomePageBackgroundFeatherIcon}
          alt="Background Feather Icon"
          className="hidden md:block absolute right-10 top-1/2 transform -translate-y-1/2 w-44 lg:w-64 xl:w-72 opacity-30 dark:invert"
        />
        <div className="text-black dark:text-blue-gray-100 text-center text-4xl">
          <h1>
            <Typewriter
              cursor
              cursorBlinking
              delaySpeed={1000}
              deleteSpeed={25}
              loop={0}
              typeSpeed={75}
              words={[
                "“Blogging is a conversation, not a broadcast.” - ProBlogger",
                "“Content is king, but context is God.” - Gary Vaynerchuk",
                "“Your blog is your online home. Make it a place people want to visit.” -  Unknown",
                "“The best blogs come from a place of passion.” -  Unknown"
            ]}
            />
          </h1>
        </div>
      </main>

      {/* footer section */}
      <footer className="FooterSection">
        <HomePageFooter />
      </footer>
    </div>
  );
};

export default UserHomePage;
