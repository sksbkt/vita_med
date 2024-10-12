"use client";
import { ENDPOINTS } from "@/constants/strings";
import { useAppSelector } from "@/hooks/useStore";
import { Avatar, Box, Stack, Typography, styled } from "@mui/material";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const { ACCESS_TOKEN, id } = useAppSelector((state) => state.authSlice);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(ENDPOINTS.authDetails, {
          id: id,
          token: ACCESS_TOKEN,
        });

        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (e: any) {}
    };
    fetchProfile();
  }, []);

  const HeaderTypoGraph = styled(Typography)({
    fontSize: 30,
    fontWeight: 500,
  });

  return user !== null ? (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        mt: "20%",
      }}
    >
      <Stack
        direction={"row"}
        gap={5}
      >
        <Avatar sx={{ width: 60, height: 60 }} />
        <Stack>
          <HeaderTypoGraph>{user.userName}</HeaderTypoGraph>
          <Typography>{user.firstName}</Typography>
          <Typography>{user.lastName}</Typography>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <></>
  );
}
export default Profile;
