import { createRoot } from "react-dom/client";
import "./style.css";
import { Button } from "@/components/ui/button";

const App = () => (
  <div>
    <h1>Retriev</h1>
    <Button>Button</Button>
  </div>
);

createRoot(document.getElementById("app")!).render(<App />);
