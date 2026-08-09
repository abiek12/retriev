import { createRoot } from "react-dom/client";
import "@/styles/style.css";
import { StrictMode } from "react";
import App from "./App";

const Root = () => (
  <StrictMode>
    <App />
  </StrictMode>
);

createRoot(document.getElementById("root")!).render(<Root />);
