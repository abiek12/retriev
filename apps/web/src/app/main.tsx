import { createRoot } from "react-dom/client";
import "@/styles/style.css";
import { Button } from "@/components/ui/button";
import Providers from "./providers";

const App = () => (
  <Providers>
    <h1>Retriev</h1>
    <Button>Button</Button>
  </Providers>
);

createRoot(document.getElementById("app")!).render(<App />);
