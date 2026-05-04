import { callAPI } from "./apiBase";

import { ReadContractSongSession, CreateContractSongSessionPayload, UpdateSessionPayload } from "@/types/sessions";

export async function getSessions(): Promise<ReadContractSongSession[]> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions`;
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function createSession(payload: CreateContractSongSessionPayload): Promise<ReadContractSongSession> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions`;
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return await callAPI(url, fetchConfig);
}

export async function getSession(id: number): Promise<ReadContractSongSession> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions/${id}`
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function deleteSession(id: number) {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions/${id}`
    const fetchConfig = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function updateContactSongSession(id: number, payload: UpdateSessionPayload): Promise<ReadContractSongSession> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions/${id}`
    const fetchConfig = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return await callAPI(url, fetchConfig);
}

export async function resetPlayerContractSongStatus(sessionId: number) {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions/${sessionId}/players/reset-contract-status`
    const fetchConfig = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
    }
    return await callAPI(url, fetchConfig);
}