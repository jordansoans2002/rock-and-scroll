import { ApiConfig } from "@rock-and-scroll/shared/types/api";


const getApiBaseUrl = (): string => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;

    console.log(envUrl);
    if(envUrl)
        return envUrl;

    return "http://localhost:3001";
}

export const API_CONFIG: ApiConfig = {
    baseUrl: getApiBaseUrl(),
    timeout: 120000,
    retries: 1,
};

export const API_ENDPOINTS = {
    DEFAULT_SETTINGS: "/api/v1/presentations/default-settings",
    CREATE_PRESENTATION: "/api/v1/presentations/create",
} as const;

export const buildApiUrl = (endpoint: string): string => {
    console.log(`build api url ${import.meta.env.MODE} ${import.meta.env.PROD}`)
    if (import.meta.env.MODE === "production") // build:frontend --mode production
        return endpoint

    return `${API_CONFIG.baseUrl}${endpoint}`;
}