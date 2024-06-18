"use client";
import React, { useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/hooks/useStore";
import { darkTheme, lightTheme } from "@/theme/muiTheme";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

function MuiProvider({ children }: { children: React.ReactNode }) {
  const { darkMode, ltrMode } = useAppSelector((state) => state.themeSlice);
  const theme = useMemo(() => {
    const currentTheme = darkMode ? darkTheme : lightTheme;
    currentTheme.direction = ltrMode ? "ltr" : "rtl";
    return currentTheme;
  }, [darkMode, ltrMode]);

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <AppRouterCacheProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              "*": { transition: "background-color 0.3s, color 0.3s" },
            }}
          />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
}

export default MuiProvider;
