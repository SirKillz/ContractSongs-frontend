"use client";

import { Box, Typography } from "@mui/material";

import FixedPage from "@/components/common/FixedPage";

export default function Home() {
  return (
    <FixedPage>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Typography
          component="h1"
          variant="h1"
        >
          Welcome to the Spotify Contract Song App!
        </Typography>
      </Box>
    </FixedPage>
  );
}
