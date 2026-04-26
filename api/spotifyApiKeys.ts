import { callAPI } from "./apiBase";

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

export {getApiKeys}