import { PaletteMode, Theme, createTheme } from "@mui/material";
import {
  PaletteOptions,
  dark,
  light,
} from "@mui/material/styles/createPalette";

// export function setTheme(themeChange: Theme) {
//   theme = themeChange;
// }
// Light theme

export const getTheme = (themeMode: boolean, ltrMode: boolean) => {
  return createTheme({
    palette: themeMode ? darkPalette : lightPalette,
    direction: ltrMode ? "ltr" : "rtl",
    typography: {
      h1: {
        fontSize: "2rem",
      },
    },
  });
};

const lightPalette: PaletteOptions = {
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
};

const darkPalette: PaletteOptions = {
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
};
//?///////////////////////////////////////
// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//     background: {
//       default: "#ffffff",
//       paper: "#f5f5f5",
//     },
//   },
//   typography: {
//     h1: {
//       fontSize: "2rem",
//     },
//   },
// });

// // Dark theme
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#bb86fc",
//     },
//     secondary: {
//       main: "#03dac6",
//     },
//     background: {
//       default: "#121212",
//       paper: "#1d1d1d",
//     },
//   },
//   typography: {
//     h1: {
//       fontSize: "2rem",
//     },
//   },
// });
// export let theme = lightTheme;

// export { lightTheme, darkTheme };
