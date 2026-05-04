import { useRouter } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getSessions, createSession, getSession, deleteSession, updateContactSongSession, resetPlayerContractSongStatus } from "@/api/sessions";
import { CreateContractSongSessionPayload, UpdateSessionPayload } from "@/types/sessions";

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

type UpdateSessionArgs = {
    sessionId: number,
    payload: UpdateSessionPayload
}

export function useUpdateSession() {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: ({sessionId, payload}: UpdateSessionArgs) => updateContactSongSession(sessionId, payload),
        onSuccess: async (_, {sessionId}) => {
            await queryClient.invalidateQueries({queryKey: ['sessions', sessionId]})
            router.push(`/sessions/${sessionId}`)
        }
    })
}

export function useResetPlayerContactSongStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (sessionId: number) => resetPlayerContractSongStatus(sessionId),
        onSuccess: async(_, sessionId) => {
            await queryClient.invalidateQueries({queryKey: ['sessions', sessionId]})
        }
    })
}