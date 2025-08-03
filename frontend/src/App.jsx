import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { BlogContext } from "./context/BlogContext";
import { Route, Routes } from "react-router-dom";
import BlogsPage from "./pages/BlogsPage";
import AboutPage from "./pages/AboutPage";
import BlogCreationPage from "./pages/BlogCreationPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TempPage from "./temp/TempPage";
import Protected from "./utils/ProtectedRoutes";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserHomePage from "./pages/UserHomePage";
import { ToastContainer, toast } from 'react-toastify';
import UserProfilePage from "./pages/UserProfilePage";
import EditBlogPage from "./pages/EditBlogPage";


const App = () => {
  const { lightMode, toggleMode } = useContext(BlogContext);

  return (
    <div className={`${lightMode ? "" : "dark"}`}>
      <ToastContainer />
      <Routes>
        {/* public routes ( everyone can access ) */}
        <Route path="/" element={<UserHomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />

        {/* protected routes ( only signed in users can access ) */}
        <Route element={<Protected />}>
          <Route path="/blogWrite" element={<BlogCreationPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/profile" element={<UserProfilePage />} />

        </Route>
        
        <Route path="/temp" element={<TempPage />} />
      </Routes>
    </div>
  );
};

export default App;
