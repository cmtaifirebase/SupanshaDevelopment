import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Define custom CSS variables for the theme
document.documentElement.style.setProperty("--primary", "#F14B05");
document.documentElement.style.setProperty("--secondary", "#E94E77");
document.documentElement.style.setProperty("--dark", "#333333");
document.documentElement.style.setProperty("--light", "#F5F5F5");

createRoot(document.getElementById("root")!).render(<App />);
