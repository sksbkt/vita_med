"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ThemeToggleBtn from "@/components/mui/ThemeToggleBtn";
import LanguageSelector from "@/components/mui/LanguageSelector";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { logOut } from "@/lib/features/authSlice/authSlice";
import { Link } from "@mui/material";
import { useEffect } from "react";

const pages = ["Products", "Pricing", "About"];
const settings = [
  { name: "Profile", href: "/user/profile" },
  { name: "Account", href: "/user/Account" },
  { name: "Dashboard", href: "/user/Dashboard" },
  { name: "Logout", href: "/user/login" },
];

type pagesType = {
  [key: string]: string;
};

function ResponsiveAppBar() {
  const dispatch = useAppDispatch();
  const { dic } = useAppSelector((state) => state.localeSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const pageNames: pagesType = dic.Pages;
  const { push } = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    setting: { name: string; href: string }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    handleUserMenuOption(setting.name);

    setAnchorElUser(null);
  };

  const handleUserMenuOption = (option: string) => {
    switch (option) {
      case "Account":
        push("/user/Dashboard");
        break;
      case "Account":
        push("/user/account");
        break;
      case "Profile":
        push("/user/profile");
        break;
      case "Logout":
        push("/user/login");
        dispatch(logOut());
        break;
      default:
        console.log(`${option} is yet to be implemented`);

        break;
    }
  };
  useEffect(() => {
    // ? Temporary workaround for hydration issues
  }, [dic]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href={"/"}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "inherit",
            }}
            underline="none"
          >
            <AdbIcon />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Link>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ ml: "0" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Box onClick={() => push(`/${page}`)}>
                    <Typography textAlign="center">
                      {pageNames[page.toUpperCase()]}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            href={"/"}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "inherit",
            }}
            underline="none"
          >
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  push(`/${page}`);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {pageNames[page.toUpperCase()]}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "auto",
            }}
          >
            <ThemeToggleBtn />
            <LanguageSelector />
          </Box>
          {/* //* reverse the token ! modifier after development of this part */}
          {!token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                // onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    // onClick={() => {}}
                  >
                    <Typography
                      textAlign="center"
                      href={setting.href}
                      component={"a"}
                      onClick={(e) => handleCloseUserMenu(e, setting)}
                    >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Link
              href={"/user/login"}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "inherit",
              }}
              underline="none"
            >
              login
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
