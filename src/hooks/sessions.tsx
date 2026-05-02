import { useRouter } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getSessions, createSession, getSession, deleteSession } from "@/api/sessions";
import { CreateContractSongSessionPayload } from "@/types/sessions";

type useGetSessionsOptions = {
    enabled?: boolean
}

export function useGetSessions({enabled}: useGetSessionsOptions) {
    return useQuery({
        queryKey: ["sessions"],
        queryFn: getSessions,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: enabled
    })
}

export function useCreateSession() {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateContractSongSessionPayload) => createSession(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ['sessions']})
            router.push(`/sessions/${data.id}`)
        }
    })

}

type useGetSessionOptions = {
    enabled?: boolean,
    id: number
}
export function useGetSession({enabled, id}: useGetSessionOptions) {
    return useQuery({
        queryKey: ['sessions', id],
        queryFn: () => getSession(id),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: enabled
    })
}

type useDeleteSessionOptions = {
    sessionId: number
}
export function useDeleteSession({sessionId}: useDeleteSessionOptions) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteSession(sessionId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['sessions']})
        }
    })
}