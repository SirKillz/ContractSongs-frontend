"use client";

import { Suspense, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { Box, Typography, Alert, Button } from "@mui/material";

import FixedPage from "@/components/common/FixedPage";
import Section from "@/components/common/Section";

import { useApiKeys, useCreateApiTokens, useRequestTokenWithCode } from "@/hooks/apiKeyManagementHooks";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  // React Query API Hooks 

  const {
    isError: isApiKeysError,
    isSuccess: isApiKeySuccess,
  } = useApiKeys({enabled: code === null});

  const {
    data: requestApiKeysData,
    isSuccess: isRequestApiKeysSuccess
  } = useRequestTokenWithCode({enabled: code !== null, code: code ?? ""})

  const {
    mutate: createApiTokens,
    isPending: isCreatingApiTokens,
    isSuccess: isCreateApiTokensSuccess,
  } = useCreateApiTokens();
  
  useEffect(() => {
    if (!isRequestApiKeysSuccess || !requestApiKeysData) return;
    if (isCreatingApiTokens || isCreateApiTokensSuccess) return;

    createApiTokens(requestApiKeysData);
  }, [
    isRequestApiKeysSuccess,
    requestApiKeysData,
    isCreatingApiTokens,
    isCreateApiTokensSuccess,
    createApiTokens,
  ]);

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
      {
        isApiKeySuccess && 
        <Section>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
          >
            <Alert 
              severity="success"
              sx={{display: "flex", justifyContent: "center"}}
            >
              You are already signed in to Spotify, proceed to Sessions
            </Alert>
            <Button 
              href="/sessions"
              variant="contained"
              sx={{backgroundColor: "#1ed760", alignSelf: "center"}}
            >
              Sessions
            </Button>
          </Box>
        </Section>
      }
    </FixedPage>
  );
}
