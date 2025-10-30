
export const STORAGE_KEYS = {
    PRESENTATION_SETTINGS: "createSongPresentation_presentationSettings",
    DEFAULT_SONG_SETTINGS: "createSongPresentation_defaultSongSettings",
    VERSION: "createSongPresentation_version"
} as const;

const CURRENT_VERSION = "1.0"

export function loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const stored = localStorage.getItem(key);

        if(stored === null)
            return defaultValue;

        const parsed = JSON.parse(stored) as T;

        // Validate that parsed data has the expected shape
        // You could add more sophisticated validation here
        if(parsed && typeof parsed === "object"){
            return parsed
        }

        console.warn(`Invalid data format in localStorage for key: ${key}`);
        return defaultValue;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error(`Failed to parse JSON from localStorage key: ${key}`, error);
        } else if(error instanceof Error && error.name === 'SecurityError') {
            console.warn("local storage is not accessible (private browsing?)", error);
        } else {
            console.error("Unexpected error loading from localStorage", error);
        }

        return defaultValue;
    }
}


export function saveToStorage<T>(key: string, value: T): boolean {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);

        localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);

        return true;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "QuotaExceededError") {
                console.error("localStorage quota exceeded", error);
            } else if (error.name === "SecurityError") {
                console.warn("localStorage not accessible (private browsing?)", error);
            } else {
                console.error("Failed to save to localStorage", error);
            }
        }

        return false;
    }
}


export function isStorageAvailable(): boolean {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true
    } catch {
        return false;
    }
}