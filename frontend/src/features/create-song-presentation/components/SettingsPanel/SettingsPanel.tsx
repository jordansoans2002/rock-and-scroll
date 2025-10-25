import { PresentationSettings, SongSettings } from "@rock-and-scroll/shared/types/settings";
import { DEFAULT_PRESENTATION_SETTINGS, DEFAULT_SONG_SETTINGS } from "@rock-and-scroll/shared/defaults/defaultSettings";
import { useState } from "react";
import SettingRow from "../SettingRow/SettingRow";
import { useResizableColumns } from "../SettingsRenderer/useResizableColumns";
import ButtonBar, { ButtonConfig } from "../ButtonBar/ButtonBar";

import styles from "./SettingsPanel.module.css"
import SettingsRenderer from "../SettingsRenderer/SettingsRenderer";
import { PRESENTATION_SETTINGS_METADATA, SONG_SETTINGS_METADATA } from "@rock-and-scroll/shared/types/settingsMetadata";

interface SongPanelProps {
    activeView: "presentation" | "song" | null;
    minimizePanel: () => void;
    songSettings: SongSettings;
    onUpdateSongSettings: (settings: SongSettings) => void;
}
export default function SettingsPanel({
    activeView,
    minimizePanel,
    songSettings,
    onUpdateSongSettings,
}: SongPanelProps) {    
    const [presentationSettings, setPresentationSettings] = useState(DEFAULT_PRESENTATION_SETTINGS);
    const [defaultSongSettings, setDefaultSongSettings] = useState(DEFAULT_SONG_SETTINGS);

    const minimize: ButtonConfig = {
        icon: <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true">
            <line x1="3" y1="8" x2="13" y2="8" stroke={"#333"} strokeWidth={2} strokeLinecap="round" />
        </svg>,
        onClick: minimizePanel
    }

    return(
        <div className={styles.panel}>
            <div className={styles.titleBar}>
                <span className={styles.title}>{activeView}</span>
                <ButtonBar
                    orientation="horizontal"
                    endGroup={[minimize]} />
            </div>

            {activeView === "presentation" && (<>
                <SettingsRenderer
                    settings={presentationSettings}
                    metadata={PRESENTATION_SETTINGS_METADATA}
                    onChange={(newSettings) => setPresentationSettings(newSettings)} />
                
                <h2>Default Song Settings</h2>
                <SettingsRenderer
                    settings={defaultSongSettings}
                    metadata={SONG_SETTINGS_METADATA}
                    onChange={(newSettings) => onUpdateSongSettings(newSettings)} />
            </>)}

            {activeView === "song" && (
                <SettingsRenderer
                    settings={songSettings}
                    metadata={SONG_SETTINGS_METADATA}
                    onChange={(newSettings) => onUpdateSongSettings(newSettings)} />
            )}

        </div>
    )
}