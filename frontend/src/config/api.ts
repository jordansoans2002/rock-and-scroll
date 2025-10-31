import { ApiConfig } from "@rock-and-scroll/shared/types/api";


const getApiBaseUrl = (): string => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;

    console.log(envUrl);
    if(envUrl)
        return envUrl;

    return "http://0.0.0.0:3001";
}

export const API_CONFIG: ApiConfig = {
    baseUrl: getApiBaseUrl(),
    timeout: 120000,
    retries: 1,
};

export const API_ENDPOINTS = {
    DEFAULT_SETTINGS: "/api/presentations/default-settings",
    CREATE_PRESENTATION: "/api/presentations/create",
} as const;

export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.baseUrl}${endpoint}`;
}