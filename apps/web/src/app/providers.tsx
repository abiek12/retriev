import { PropsWithChildren } from "react";
import ThemeProvider from "@/components/providers/theme-provider";

const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
);

export default Providers;
