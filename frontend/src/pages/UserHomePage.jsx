import React from "react";
import HomePageNavbar from "../components/HomePageNavbar";
import { HomePageFooter } from "../components/HomePageFooter";

const UserHomePage = () => {
  return (
    <div className="WholeWebsite dark:bg-black">
      {/* header section */}
      <header className="HeaderSection">
        <HomePageNavbar login={false} />
      </header>
      {/* content section */}
      <main className="ContentSection flex items-center justify-center h-screen">
        <p>content goes here</p>
      </main>
      {/* footer section */}
      <footer className="FooterSection items-end">
        <HomePageFooter />
      </footer>
    </div>
  );
};

export default UserHomePage;
