import { PresentationSettings, Song } from "./settings";

export interface CreatePresentationRequest {
    presentationSettings: PresentationSettings;
    songs: Song[];
}

export interface ApiError {
    success: false;
    message: string;
    stack?: string;  // Only in development
}

export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    retries?: number;
}