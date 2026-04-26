async function callAPI<T>(url: string, fetchConfig: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`${response.status} - ${errorData.detail}`)
        }
        const data = await response.json()
        return data as T
    } catch (err) {

        // If we intentionally threw an Error above (e.g., 404), preserve it
        if (err instanceof Error) {
            throw err;
        
        }

        // Truly unexepected non-Error
        throw new Error(`500 - Unknown Server Error ${err}`)
    }
}

export {callAPI};
