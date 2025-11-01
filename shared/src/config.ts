export const config = {
    apiBaseUrl:  "http://localhost:3001",
    // (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    //     process.env.API_BASE_URL ||
    //     "http://0.0.0.0:3001",

    maxSongs: 20,
    // Number(
    //     (typeof import.meta !== "undefined" && import.meta.env?.VITE_MAX_SONGS) ||
    //     process.env.VITE_MAX_SONGS ||
    //     20
    // ),
    
    maxSlides: 100,
    // Number(
    //     (typeof import.meta !== "undefined" && import.meta.env?.VITE_MAX_SLIDES) ||
    //     process.env.VITE_MAX_SLIDES ||
    //     20
    // ),
    
    maxSlidesPerSong: 50,
    // Number(
    //     (typeof import.meta !== "undefined" && import.meta.env?.VITE_MAX_SLIDES_PER_SONG) ||
    //     process.env.VITE_MAX_SLIDES_PER_SONG ||
    //     20
    // )    
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
