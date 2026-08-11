import { QueryProvider } from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
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
        <RouterProvider router={routes} />
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
