import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import NavbarProvider from "./context/NavContext";


createRoot(document.getElementById("root")).render(
    <NavbarProvider>
      <App />
    </NavbarProvider>
    
);
