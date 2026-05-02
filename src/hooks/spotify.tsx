import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getSpotifyContractSongServiceStatus, getSpotifyPlaylists, getSpotifyPlaylistSongs, startSpotifyContractSongService, stopSpotifyContractSongService } from "@/api/spotify";

type useSpotifyPlaylistOptions = {
    enabled?: boolean
}

export function useGetSpotifyPlaylists({enabled}: useSpotifyPlaylistOptions) {
    return useQuery({
        queryKey: ['spotify', 'playlists'],
        queryFn: getSpotifyPlaylists,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: enabled
    })
}

type useGetSpotifyPlaylistSongOptions = {
    enabled?: boolean
    playlist_id: string
}
export function useGetSpotifyPlaylistSongs({enabled, playlist_id}: useGetSpotifyPlaylistSongOptions) {
    return useQuery({
        queryKey: ['spotify', 'playlist', playlist_id, 'songs'],
        queryFn: () => getSpotifyPlaylistSongs(playlist_id),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: enabled
    })
}

type useGetSpotifyContactSongServiceStatusOptions = {
    enabled?: boolean
}
export function useGetSpotifyContactSongServiceStatus({enabled}: useGetSpotifyContactSongServiceStatusOptions) {
    return useQuery({
        queryKey: ['spotify', 'session', 'contract-song-service', 'status'],
        queryFn: getSpotifyContractSongServiceStatus,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: enabled
    })
}

type useStartSpotifyContactSongServiceOptions = {
    sessionId: number
}
export function useStartSpotifyMonitoringService({sessionId}: useStartSpotifyContactSongServiceOptions) {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: () => startSpotifyContractSongService(sessionId),
            onSuccess: async () => {
                queryClient.invalidateQueries({queryKey: ['spotify', 'session', 'contract-song-service', 'status']})
            }
        })
}

export function useStopSpotifyMonitoringService() {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: () => stopSpotifyContractSongService(),
            onSuccess: async () => {
                queryClient.invalidateQueries({queryKey: ['spotify', 'session', 'contract-song-service', 'status']})
            }
        })
}