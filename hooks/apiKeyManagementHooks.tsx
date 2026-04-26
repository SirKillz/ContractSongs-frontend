"use client"

import { useQuery } from "@tanstack/react-query";

import { getApiKeys, requestApiKeysWithCode } from "@/api/spotifyApiKeys";

type useApiKeyOptions = {
  enabled?: boolean
}

export function useApiKeys({enabled}: useApiKeyOptions) {
  return useQuery({
    queryKey: ["api-keys"],
    queryFn: getApiKeys,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: enabled
  });
}

type useRequestTokenWithCodeOptions = {
  enabled?: boolean,
  code: string
}
export function useRequestTokenWithCode({enabled, code}: useRequestTokenWithCodeOptions) {
  return useQuery({
    queryKey: ["api-keys", "proxy", "get-tokens", "code"],
    queryFn: () => requestApiKeysWithCode(code),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: enabled

  })
}