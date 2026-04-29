import { useQuery } from "@tanstack/react-query";

import { getSpotifyPlaylists } from "@/api/spotify";

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