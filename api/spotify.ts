import { callAPI } from "./apiBase";

export async function getSpotifyPlaylists() {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/spotify/playlists`;
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}