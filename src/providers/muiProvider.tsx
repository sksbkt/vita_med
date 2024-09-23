"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/hooks/useStore";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { getTheme } from "@/theme/muiTheme";

function MuiProvider({ children }: { children: React.ReactNode }) {
  const { darkMode, ltrMode } = useAppSelector((state) => state.themeSlice);
  const { dic } = useAppSelector((state) => state.localeSlice);
  const [isMounted, setIsMounted] = useState(false);

  let theme = useMemo(() => {
    return getTheme(darkMode, ltrMode);
  }, [darkMode, ltrMode]);

  const cacheRtl = createCache({
    key: ltrMode ? "muiltr" : "muirtl",
    stylisPlugins: ltrMode ? [] : [prefixer, rtlPlugin],
  });
  useEffect(() => {
    if (typeof window != "undefined") {
      document.dir = ltrMode ? "ltr" : "rtl";
    }
  }, [ltrMode, dic, theme]);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      {isMounted ? (
        <ThemeProvider theme={theme}>
          <AppRouterCacheProvider>
            <CacheProvider value={cacheRtl}>
              <CssBaseline />
              <GlobalStyles
                styles={{
                  "*": { transition: "background-color 0.3s, color 0.3s" },
                }}
              />
              {children}
            </CacheProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
      ) : (
        <></>
      )}
    </>
  );
}

export default MuiProvider;
