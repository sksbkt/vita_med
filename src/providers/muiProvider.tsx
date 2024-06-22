"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/hooks/useStore";
// import { darkTheme, lightTheme } from "@/theme/muiTheme";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { getTheme } from "@/theme/muiTheme";

function MuiProvider({ children }: { children: React.ReactNode }) {
  const { darkMode, ltrMode } = useAppSelector((state) => state.themeSlice);

  let theme = useMemo(() => {
    // const currentTheme = darkMode ? darkTheme : lightTheme;
    // currentTheme.direction = ltrMode ? "ltr" : "rtl";
    // return currentTheme;
    return getTheme(darkMode, ltrMode);
  }, [darkMode, ltrMode]);

  const cacheRtl = createCache({
    key: ltrMode ? "muiltr" : "muirtl",
    stylisPlugins: ltrMode ? [prefixer, rtlPlugin] : [],
  });
  document.dir = ltrMode ? "ltr" : "rtl";
  return (
    <AppRouterCacheProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
