"use client"

import { useQuery } from "@tanstack/react-query";

import { getApiKeys } from "@/api/spotifyApiKeys";

export function useApiKeys() {
  return useQuery({
    queryKey: ["api-keys"],
    queryFn: getApiKeys,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}