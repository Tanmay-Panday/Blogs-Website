import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [lightMode, setMode] = useState(true);
  const navigate = useNavigate()
  const toggleMode = () => {
    setMode(!lightMode);
  };
  const [isSignedIn, setIsSignedIn] = useState(true);
  const value = { lightMode, toggleMode, isSignedIn, setIsSignedIn,navigate };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
