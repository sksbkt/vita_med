import { theme } from "@/theme/muiTheme";
import React, { useMemo } from "react";

function ThemeToggle() {
  const activateName = useMemo(
    () => (theme.palette.mode === "dark" ? "light" : "dark"),
    [theme]
  );
  return <div>ThemeToggle</div>;
}

export default ThemeToggle;
