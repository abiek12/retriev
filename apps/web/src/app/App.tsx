import { QueryProvider } from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { routes } from "@/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <RouterProvider router={routes} />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
