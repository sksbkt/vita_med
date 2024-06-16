import { Theme, createTheme } from "@mui/material";

// export function setTheme(themeChange: Theme) {
//   theme = themeChange;
// }
// Light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
    },
  },
});
export let theme = lightTheme;

export { lightTheme, darkTheme };