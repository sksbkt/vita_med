"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
function NextThemesProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
    >
      {children}
    </ThemeProvider>
  );
}

export default NextThemesProvider;
