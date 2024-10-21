"use client";
import LanguageSelector from "@/components/mui/navBarCompoenents/LanguageSelector";
import ThemeToggleBtn from "@/components/mui/navBarCompoenents/ThemeToggleBtn";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Menu,
  Portal,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers/promises";

function CustomNavBar() {
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [toolBarHeight, setToolBarHeight] = useState(0);

  const [open, setOpen] = useState(false);
  const timeOutRef = useRef<number | null>(null);
  const handleOpenMenu: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    // setAnchorEl(event.currentTarget);
    handleClearTimeOut();
    setOpen(true);
  };
  const handleCloseMenu = () => {
    // setAnchorEl(null);
    if (open) {
      timeOutRef.current = window.setTimeout(() => {
        setOpen(false);
        console.log("close");
      }, 100);
    }
  };
  const handleClearTimeOut = () => {
    if (timeOutRef.current !== null) clearTimeout(timeOutRef.current);
  };
  useEffect(() => {
    setToolBarHeight(toolbarRef.current?.clientHeight ?? 20);
  }, []);
  return (
    <AppBar
      component={"div"}
      position="static"
      sx={{ position: "relative" }}
    >
      <Container maxWidth="lg">
        <Toolbar
          ref={toolbarRef}
          disableGutters
        >
          <Button
            component={"a"}
            onMouseEnter={handleOpenMenu}
            onMouseLeave={handleCloseMenu}
            sx={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            href="/products"
          >
            Products
          </Button>
          <Portal>
            <Box
              component={"a"}
              onMouseEnter={handleOpenMenu}
              sx={{
                width: "100%",
                // ? TESTING
                height: open ? "300px" : 0,
                // height: "300px",
                backgroundColor: "red",
                transition: "height 0.5s ease-in-out",
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                marginTop: `${toolBarHeight}px`,
                zIndex: 10,
                overflow: "hidden",
              }}
              onMouseLeave={handleCloseMenu}
            >
              <Container sx={{ height: "100%", width: "100%" }}>
                <Grid
                  direction={"column"}
                  sx={{ height: "100%" }}
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    xs={2}
                    md={2}
                    lg={2}
                  >
                    <Grid item>
                      <Link sx={{ color: "white" }}>Test</Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Portal>

          <ThemeToggleBtn />
          <LanguageSelector />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomNavBar;
