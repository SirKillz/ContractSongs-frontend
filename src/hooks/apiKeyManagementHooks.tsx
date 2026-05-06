"use client"

import { useRouter } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getApiKeys, requestApiKeysWithCode, createApiTokens, deleteApiKeys } from "@/api/spotifyApiKeys";

import { CreateApiTokensPayload } from "@/types/apiKeys";

type useApiKeyOptions = {
  enabled?: boolean
}

export function useGetApiKeys({enabled}: useApiKeyOptions) {
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
    queryKey: ["api-keys", "proxy", "get-tokens", code],
    queryFn: () => requestApiKeysWithCode(code),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: enabled && code.length > 0

  })
}

export function useCreateApiTokens() {
  const router = useRouter();
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateApiTokensPayload) => createApiTokens(payload),
    onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: ['api-keys']})
      router.replace("/sessions")
    }
  })
}

export function useDeleteApiTokens() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteApiKeys(),
    onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: ['api-key']})
      router.replace("/")
    }
  })
}
