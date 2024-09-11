"use client";
import { AUTHED_ROUTES } from "@/constants/authedRoutes";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { logOut } from "@/lib/features/authSlice/authSlice";
import { darkPalette } from "@/theme/muiTheme";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthedRoute = isAuthed(pathName);
  const { ACCESS_TOKEN } = useAppSelector((state) => state.authSlice);

  const LoadingScreen = styled("div")(({ theme }) => ({
    backgroundColor: darkPalette.background?.default,
    color: "fff",
    padding: theme.spacing(0, 2),
    height: "100%",
    width: "100vw",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  }));

  useEffect(() => {
    if (isAuthedRoute && !ACCESS_TOKEN) {
      push("/user/login");
      // dispatch(logOut());
    }
    setIsLoading(false);
  }, [dispatch, isAuthedRoute, push, ACCESS_TOKEN, isLoading]);
  if (isLoading || (isAuthedRoute && !ACCESS_TOKEN)) {
    return (
      <LoadingScreen>
        <Typography sx={{ color: "#fff" }}>Loading...</Typography>
        <CircularProgress />
      </LoadingScreen>
    );
  } else {
    return children;
  }
}

export default AuthWrapper;

function isAuthed(pathName: string): boolean {
  return AUTHED_ROUTES.includes(
    pathName.substring(pathName.lastIndexOf("/", pathName.length))
  );
}
