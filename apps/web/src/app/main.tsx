import { createRoot } from "react-dom/client";
import "@/styles/style.css";
import Providers from "./Providers";
import { StrictMode } from "react";
import App from "./App";

const Root = () => (
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);

createRoot(document.getElementById("root")!).render(<Root />);
