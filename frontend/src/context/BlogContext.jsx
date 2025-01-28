import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [lightMode, setMode] = useState(true);

  const toggleMode = () => {
    setMode(!lightMode);
  };

  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const [isSignedIn, setIsSignedIn] = useState(!!storedUser); // Initialize correctly

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsSignedIn(true);
    }
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useState(null); // To store user details
  const signOut = () => {
    localStorage.clear();
    setIsSignedIn(false);
    setUser(null);
    navigate(`/`);
  };

  const value = {
    lightMode,
    toggleMode,
    isSignedIn,
    setIsSignedIn,
    user,
    setUser,
    signOut,
    navigate,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
