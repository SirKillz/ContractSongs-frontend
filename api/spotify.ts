import { callAPI } from "./apiBase";

import { SpotifyPlaylistResponse, SpotifySong } from "@/types/spotify";

export async function getSpotifyPlaylists(): Promise<SpotifyPlaylistResponse> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/playlists`;
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function getSpotifyPlaylistSongs(playlist_id: string): Promise<SpotifySong[]> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/playlists/${playlist_id}/songs`
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}