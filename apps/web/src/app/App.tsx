import { QueryProvider } from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { routes } from "@/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delay={400}>
          <RouterProvider router={routes} />
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
