import { useCallback, useState } from "react";


export const usePreviewTrayUI = () => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const togglePreview = useCallback(
        () => { setIsPreviewOpen(!isPreviewOpen) },
        []
    );

    const minimizePreview = useCallback(
        () => { setIsPreviewOpen(false) },
        []
    );

    return {
        isPreviewOpen,
        togglePreview,
        minimizePreview
    }

}