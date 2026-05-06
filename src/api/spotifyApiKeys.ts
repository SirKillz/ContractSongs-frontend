import { callAPI } from "./apiBase";

import { CreateApiTokensPayload, GetApiKeysResponse, RequestApiKeyResponse } from "@/types/apiKeys";

async function getApiKeys(): Promise<GetApiKeysResponse> {

    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api-keys`
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    return await callAPI<GetApiKeysResponse>(url, fetchConfig)
}

async function requestApiKeysWithCode(code: string): Promise<RequestApiKeyResponse> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api-keys/proxy/spotify/get-tokens`);
    url.search = new URLSearchParams({code: code}).toString();
    
    const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI<RequestApiKeyResponse>(url.toString(), fetchConfig)
}

async function createApiTokens(payload: CreateApiTokensPayload): Promise<GetApiKeysResponse> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api-keys`
    const fetchConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return await callAPI<GetApiKeysResponse>(url, fetchConfig)
}

async function deleteApiKeys() {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api-keys`
    const fetchConfig = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await callAPI(url, fetchConfig)
}

export { getApiKeys, requestApiKeysWithCode, createApiTokens, deleteApiKeys }
