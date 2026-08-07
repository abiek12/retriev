import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemeProvider {...props}>{children}</NextThemeProvider>
);

export default ThemeProvider;
