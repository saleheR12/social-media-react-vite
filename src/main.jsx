import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { PostsProvider } from "./context/PostsContext.jsx";
import { LayoutProvider } from './context/LayoutContext';
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LayoutProvider>
        <SidebarProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </SidebarProvider>
      </LayoutProvider>
    </BrowserRouter>
  </StrictMode>,
);
