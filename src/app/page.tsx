"use client";

import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import { Box } from "@mui/material";
// import { theme } from "@/theme/muiTheme";

export default function Home() {
  return (
    <Box
      sx={{
        width: { sx: "40%" },
      }}
    >
      <VideoPlayer />
    </Box>
  );
}
