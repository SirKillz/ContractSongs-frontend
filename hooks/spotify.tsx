import { useQuery } from "@tanstack/react-query";

import { getSpotifyPlaylists, getSpotifyPlaylistSongs } from "@/api/spotify";

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