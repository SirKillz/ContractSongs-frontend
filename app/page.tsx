"use client";

import { Box, Typography } from "@mui/material";

import FixedPage from "@/components/common/FixedPage";

import { useApiKeys } from "@/hooks/apiKeyManagementHooks";

export default function Home() {

  const {isPending, isError, data, error} = useApiKeys();

  return (
    <FixedPage>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Typography component="h1" variant="h1">Welcome to the Spotify Contract Song App!</Typography>
      </Box>
    </FixedPage>
  );
}
