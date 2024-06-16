"use client";
import React, { useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useAppSelector } from "@/hooks/useStore";
import { darkTheme, lightTheme } from "@/theme/muiTheme";

function MuiProvider({ children }: { children: React.ReactNode }) {
  const { darkMode, ltrMode } = useAppSelector((state) => state.themeSlice);

  const theme = useMemo(() => {
    return darkMode ? darkTheme : lightTheme;
  }, [darkMode]);
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*": { transition: "background-color 0.3s, color 0.3s" },
          }}
        />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default MuiProvider;
