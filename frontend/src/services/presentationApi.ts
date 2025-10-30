import { CreatePresentationRequest } from "@rock-and-scroll/shared/types/api";
import { API_CONFIG, API_ENDPOINTS, buildApiUrl } from "../config/api";

export class PresentationApiError extends Error {
   constructor(
    message: string,
   ) {
    super(message);
    this.name = "PresentationApiError"
   }
}


export class PresentationApiService {

    static async createPresentation(
        request: CreatePresentationRequest
    ): Promise<{ blob: Blob; filename: string }> {

        //TODO can add metadata to request if required

        try {
            const url = buildApiUrl(API_ENDPOINTS.CREATE_PRESENTATION);

            const controller = new AbortController();
            const timeoutId = setTimeout(
                () => controller.abort(),
                API_CONFIG.timeout || 300000
            );

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const contentType = response.headers.get("Content-Type") || "";
            if(contentType.includes("application/json")) {
                const json = await response.json();
                const message = json.message || "Server error occurred";
                throw new PresentationApiError(message);
            }

            if(!response.ok) {
                throw new PresentationApiError(
                    `Server returned ${response.status}: ${response.statusText}`,
                );
            }

            const blob = await response.blob();
            if (blob.size === 0) {
                throw new PresentationApiError(
                    "Recieved empty file from server"
                );
            }

            const filename = this.extractFilename(response) || "rock-and-scroll.pptx";
            return { blob, filename };
        } catch (error) {
            if (error instanceof PresentationApiError) {
                throw error
            }

            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new PresentationApiError(
                    "Network error: Could not connect to server. Check your connect and contact admin if problem persists."
                )
            }

            if (error instanceof Error && error.name === "AbortError") {
                throw new PresentationApiError(
                    "Request timeout: Server took too long to create presentation. Try again later or reduce the number of songs"
                );
            }

            throw new PresentationApiError (
                error instanceof Error ? error.message : "Unknown error occurred"
            );
        }
    }


    private static extractFilename(response: Response): string | null {
        const disposition = response.headers.get("Content-Disposition");
        if (!disposition) return null;

        // Look for filename=... optionally quoted
        const match = disposition.match(/filename\*?=(?:UTF-8''|")?([^";\n]*)/i);
        if (!match) return null;

        try {
            // Decode URI-encoded filenames (RFC 5987) if present
            return decodeURIComponent(match[1].replace(/['"]/g, ""));
        } catch {
            return match[1].replace(/['"]/g, "");
        }
    }
}