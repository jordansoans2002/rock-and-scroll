import { PresentationSettings, SongSettings } from "@rock-and-scroll/shared/types/settings";
import ButtonBar, { ButtonConfig } from "../../ButtonBar/ButtonBar";

import styles from "./SettingsPanel.module.css"
import SettingsRenderer from "../SettingsRenderer/SettingsRenderer";
import { PRESENTATION_SETTINGS_METADATA, SONG_SETTINGS_METADATA } from "@rock-and-scroll/shared/types/settingsMetadata";
import { ActiveSettingView } from "src/features/create-song-presentation/pages/CreateSongPresentationPage/useSettingPanelUI";

interface SongPanelProps {
    activeView: ActiveSettingView;
    minimizePanel: () => void;

    presentationSettings: PresentationSettings;
    onUpdatePresentationSettings: (settings: PresentationSettings) => void;

    defaultSongSettings: SongSettings,
    onUpdateDefaultSongSettings: (settings: SongSettings) => void;

    selectedSongSettings: SongSettings;
    onUpdateSongSettings: (settings: SongSettings) => void;
}

export default function SettingsPanel({
    activeView,
    minimizePanel,

    presentationSettings,
    onUpdatePresentationSettings,

    defaultSongSettings,
    onUpdateDefaultSongSettings,

    selectedSongSettings,
    onUpdateSongSettings,
}: SongPanelProps) {    
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
                <ButtonBar orientation="horizontal" endGroup={[minimize]} />
            </div>

            {activeView === "presentation" && (<>
                <SettingsRenderer
                    settings={presentationSettings}
                    metadata={PRESENTATION_SETTINGS_METADATA}
                    onChange={onUpdatePresentationSettings} />
                
                <h2>Default Song Settings</h2>
                <SettingsRenderer
                    settings={defaultSongSettings}
                    metadata={SONG_SETTINGS_METADATA}
                    onChange={onUpdateDefaultSongSettings} />
            </>)}

            {activeView === "song" && (
                <SettingsRenderer
                    settings={selectedSongSettings}
                    metadata={SONG_SETTINGS_METADATA}
                    onChange={onUpdateSongSettings} />
            )}

        </div>
    )
}