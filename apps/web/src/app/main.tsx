import { createRoot } from "react-dom/client";
import "@/styles/style.css";
import Providers from "./providers";
import { StrictMode } from "react";

const App = () => (
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);

createRoot(document.getElementById("app")!).render(<App />);
