import { createTheme } from "@mui/material/styles";
import { reducedMotionQuery } from "./animations";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565c0",
      light: "#42a5f5",
      dark: "#0d47a1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0288d1",
    },
    background: {
      default: "#eef6ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#102a43",
      secondary: "#486581",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(21, 101, 192, 0.12)",
          boxShadow: "0 12px 30px rgba(13, 71, 161, 0.08)",
          transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
          [reducedMotionQuery]: {
            transition: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
          [reducedMotionQuery]: {
            transition: "none",
          },
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 160ms ease, background-color 160ms ease",
          [reducedMotionQuery]: {
            transition: "none",
          },
          "&:hover": {
            transform: "translateY(-1px) scale(1.04)",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginInline: 12,
          marginBlock: 4,
          transition: "background-color 180ms ease, color 180ms ease, transform 180ms ease",
          [reducedMotionQuery]: {
            transition: "none",
          },
          "&:hover": {
            transform: "translateX(2px)",
          },
        },
      },
    },
  },
});
