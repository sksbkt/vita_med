"use client";
import { Box, IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setThemeMode } from "@/lib/features/themeSlice";
import { useEffect, useState } from "react";

function ThemeToggleBtn() {
  const { darkMode, ltrMode } = useAppSelector((state) => state.themeSlice);
  const dispatch = useAppDispatch();
  // ? SSR conflict issue
  const [mode, setMode] = useState("");

  function toggleDarkMode() {
    dispatch(setThemeMode({ darkMode: !darkMode, ltrMode }));
  }
  useEffect(() => {
    setMode(darkMode ? "Dark" : "Light");
    // * TODO: INITIAL STATE WILL BE SET HERE
  }, [darkMode]);

  return (
    <Box
      sx={{
        display: "flex",
        // width: "100%",
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "background.default",
        // color: "text.primary",
        borderRadius: 1,
        // p: 3,
      }}
    >
      {/* //! TESTING */}
      <Tooltip title={`${mode} mode`}>
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggleDarkMode}
          color="inherit"
        >
          {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ThemeToggleBtn;
