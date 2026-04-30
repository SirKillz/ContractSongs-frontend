import { callAPI } from "./apiBase";

import { ContractSongSession, CreateContractSongSessionPayload } from "@/types/sessions";

export async function getSessions(): Promise<ContractSongSession[]> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sessions`;
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig);
}

export async function createSession(payload: CreateContractSongSessionPayload): Promise<ContractSongSession> {
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