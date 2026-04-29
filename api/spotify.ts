import { callAPI } from "./apiBase";

import { SpotifyPlaylistResponse } from "@/types/spotify";

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