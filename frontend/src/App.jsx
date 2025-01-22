import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import HomePage from "./pages/UserHomePage";
import DarkModeToggler from "./components/DarkModeToggler";
import { BlogContext } from "./context/BlogContext";
import { Route, Routes } from "react-router-dom";
import BlogsPage from "./pages/BlogsPage";
import AboutPage from "./pages/AboutPage";
import BlogCreationPage from "./pages/BlogCreationPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const { lightMode, toggleMode } = useContext(BlogContext);

  return (
    <div className={`${lightMode ? "" : "dark"}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogWrite" element={<BlogCreationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
