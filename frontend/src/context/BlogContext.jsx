import { createContext, useState } from "react";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [lightMode, setMode] = useState(true);
  const toggleMode = () => {
    setMode(!lightMode);
  };
  const [isSignedIn, setIsSignedIn] = useState(true);
  const value = { lightMode, toggleMode, isSignedIn, setIsSignedIn };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
