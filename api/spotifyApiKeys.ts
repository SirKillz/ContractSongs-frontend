import { callAPI } from "./apiBase";

import { CreateApiTokensPayload } from "@/types/apiKeys";

async function getApiKeys() {

    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api-keys`
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    return await callAPI(url, fetchConfig)
}

async function requestApiKeysWithCode(code: string) {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api-keys/proxy/spotify/get-tokens`);
    url.search = new URLSearchParams({code: code}).toString();
    
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url.toString(), fetchConfig)
}

async function createApiTokens(payload: CreateApiTokensPayload) {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api-keys`
    const fetchConfig = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return await callAPI(url, fetchConfig)
}

export { getApiKeys, requestApiKeysWithCode, createApiTokens }