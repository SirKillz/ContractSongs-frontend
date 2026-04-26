"use client";

import { useSearchParams } from "next/navigation";
import { Box, Typography, Alert, Button } from "@mui/material";

import FixedPage from "@/components/common/FixedPage";
import Section from "@/components/common/Section";

import { useApiKeys, useRequestTokenWithCode } from "@/hooks/apiKeyManagementHooks";

export default function Home() {

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  // React Query API Hooks 

  const {
    isPending: isApiKeysPending, 
    isError: isApiKeysError, 
    data: apiKeysData
  } = useApiKeys({enabled: code === null});

  const {
    isPending: isRequestApiKeysPending,
    isError: isRequestApiKeysError,
    data: requestApiKeysData,
  } = useRequestTokenWithCode({enabled: code !== null, code: code ?? ""})

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


      {isApiKeysError && 
        <Section>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            <Alert 
              severity="error"
              sx={{display: "flex", justifyContent: "center"}}
            >
              No Spotify Credentials Detected, Please Sign In
            </Alert>
            <Button 
              href="https://accounts.spotify.com/authorize?client_id=400ccbc311e24c878036fc6821ec6e98&response_type=code&redirect_uri=http://127.0.0.1:3000&scope=user-read-currently-playing%20user-modify-playback-state%20playlist-read-private"
              variant="contained"
              sx={{backgroundColor: "#1ed760", alignSelf: "center"}}
            >
              Spotify Sign In
            </Button>
          </Box>
        </Section>
      }
    </FixedPage>
  );
}
