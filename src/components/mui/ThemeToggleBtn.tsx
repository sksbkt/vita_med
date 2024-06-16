import { theme } from "@/theme/muiTheme";
import { Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setThemeMode } from "@/lib/features/themeSlice";

function ThemeToggleBtn() {
  const { darkMode, ltrMode } = useAppSelector((state) => state.themeSlice);
  const dispatch = useAppDispatch();

  function toggleDarkMode() {
    dispatch(setThemeMode({ darkMode: !darkMode, ltrMode }));
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {darkMode ? "Dark" : "Light"} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={toggleDarkMode}
        color="inherit"
      >
        {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Box>
  );
}

export default ThemeToggleBtn;
