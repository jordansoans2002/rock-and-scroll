import { PresentationSettings, Song } from "@rock-and-scroll/shared/types/settings";
import { useCallback, useState } from "react";
import { PresentationApiError, PresentationApiService } from "../../../services/presentationApi";

interface CreationState {
    isCreating: boolean;
    error?: string;
}

export const useCreatePresentation = () => {
    const [state, setState] = useState<CreationState>({isCreating: false})

    const createPresentation = useCallback(
        async (
            songs: Song[],
            presentationSettings: PresentationSettings
        ): Promise<void> => {
            if(songs.length === 0) {
                setState({
                    isCreating: false,
                    error: "Require atleast one song to create a presentation",
                });
                return;
            }

            setState({
                isCreating: true,
                error: undefined,
            });

            try {
                const { blob, filename } = await PresentationApiService.createPresentation({songs, presentationSettings});
                downloadBlob(blob, filename);

                setState({
                    isCreating: false,
                    error: undefined,
                });
            } catch (error) {
                const errorMessage = error instanceof PresentationApiError ?
                    error.message : "An unexpected error occurred while creating this presentation";

                setState({
                    isCreating: false,
                    error: errorMessage,
                })

                console.error("Presentation creation failed: ", error);

                throw error;
            }
        },
        []
    );

    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: undefined }));
    }, []);

    return {
        createPresentation,
        isCreating: state.isCreating,
        error: state.error,
        clearError,
    };
};


function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 90)
}