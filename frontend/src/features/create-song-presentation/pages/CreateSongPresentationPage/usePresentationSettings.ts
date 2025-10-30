import { PresentationSettings, SongSettings } from "@rock-and-scroll/shared/types/settings";
import { useCallback } from "react";


interface UsePresentationSettingsParams {
    presentationSettings: PresentationSettings;
    setPresentationSettings: React.Dispatch<React.SetStateAction<PresentationSettings>>;
    defaultSongSettings: SongSettings;
    setDefaultSongSettings: React.Dispatch<React.SetStateAction<SongSettings>>;
}

export const usePresentationSettings = ({
    presentationSettings,
    setPresentationSettings,
    defaultSongSettings,
    setDefaultSongSettings,
}: UsePresentationSettingsParams) => {

    const updatePresentationSetting = useCallback(
        <T extends keyof PresentationSettings>(
            field: T,
            value: PresentationSettings[T]
        ) => {
           setPresentationSettings((prev) => ({
                ...prev,
                [field]: value,
           })); 
        },
        [setPresentationSettings]
    );

    const updatePresentationSettings = useCallback(
        (newSettings: PresentationSettings) => {
            setPresentationSettings(newSettings);
        },
        [setPresentationSettings]
    );
    
    const updateDefaultSongSettings = useCallback(
        (newSettings: SongSettings) => {
            setDefaultSongSettings(newSettings);
        },
        [setDefaultSongSettings]
    );

    return {
        updatePresentationSetting,
        updatePresentationSettings,
        updateDefaultSongSettings,
    }
}

