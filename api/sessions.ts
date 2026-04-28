import { callAPI } from "./apiBase";

import { ContractSongSession } from "@/types/sessions";

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