export const limits = {
    maxSongs: 20,    
    maxSlides: 100,
    maxSlidesPerSong: 50,
}

// function getEnvVar(key: string, fallback: string): string {
//   if (typeof import.meta !== "undefined" && import.meta.env) {
//     return (import.meta.env as any)[key] ?? fallback;
//   }
//   if (typeof process !== "undefined" && process.env) {
//     return process.env[key] ?? fallback;
//   }
//   return fallback;
// }

// apiBaseUrl:  "http://localhost:3001",
    // (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    //     process.env.API_BASE_URL ||
    //     "http://0.0.0.0:3001",
