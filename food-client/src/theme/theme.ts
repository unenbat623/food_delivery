import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#34d399",
      main: "#18BA51",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#fbbf24",
      main: "#f59e0b",
      dark: "#d97706",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "none",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "0 4px 12px rgba(24, 186, 81, 0.25)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        },
      },
    },
  },
});
