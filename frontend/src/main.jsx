import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import BlogContextProvider from "./context/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  // to use light and dark themes
  <ThemeProvider>
    {/* to provide routes to different pages */}
    <BrowserRouter>
      {/* to prevent prop drilling */}
      <BlogContextProvider>
        <App />
      </BlogContextProvider>
    </BrowserRouter>
  </ThemeProvider>
);
