"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setLanguage } from "@/lib/features/localeSlice";
import { setThemeMode } from "@/lib/features/themeSlice";

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const { language } = useAppSelector((state) => state.localeSlice);
  const { darkMode } = useAppSelector((state) => state.themeSlice);

  const [currLang, setCurrLang] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelection = (lang: string) => {
    dispatch(setLanguage({ language: lang }));
    dispatch(setThemeMode({ darkMode: darkMode, ltrMode: lang == "en" }));
    setAnchorEl(null);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setCurrLang(language);
  }, [language]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
      >
        {currLang}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleSelection("en")}>English</MenuItem>
        <MenuItem onClick={() => handleSelection("fa")}>Farsi</MenuItem>
      </Menu>
    </div>
  );
}
