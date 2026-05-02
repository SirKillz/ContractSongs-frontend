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

export async function startSpotifyContractSongService(sessionId: number) {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/session/${sessionId}/start-contract-song-service`
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function stopSpotifyContractSongService() {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/session/stop-contract-song-service`
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}