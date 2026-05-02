import { callAPI } from "./apiBase";

import { ContactSongMonitoringStatus, SpotifyPlaylistResponse, SpotifySong } from "@/types/spotify";

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

export async function getSpotifyContractSongServiceStatus(): Promise<ContactSongMonitoringStatus> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/session/contract-song-service/status`
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function startSpotifyContractSongService(sessionId: number): Promise<ContactSongMonitoringStatus> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/session/${sessionId}/start-contract-song-service`
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function stopSpotifyContractSongService(): Promise<ContactSongMonitoringStatus> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/session/stop-contract-song-service`
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}