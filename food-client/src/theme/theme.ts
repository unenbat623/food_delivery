import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  spacing: 4,
  palette: {
    mode: "dark",
    secondary: {
      main: "#44EE66",
    },
  },
});
