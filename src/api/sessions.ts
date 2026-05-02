import { callAPI } from "./apiBase";

import { ReadContractSongSession, CreateContractSongSessionPayload } from "@/types/sessions";

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