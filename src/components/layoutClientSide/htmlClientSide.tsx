"use client";
// ! DEPRECATED
import { CssBaseline, useTheme } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HtmlClientSide({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  document.dir = "";
  return (
    <html
      lang="en"
      dir={theme.direction}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
