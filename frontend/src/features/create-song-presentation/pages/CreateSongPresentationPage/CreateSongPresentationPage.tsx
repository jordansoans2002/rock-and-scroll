import SlidePreviewTray from "../../components/SlidePreviewTray/SlidePreviewTray";
import SongInput from "../../components/SongInput/SongInput";
import SongList from "../../components/SongList/SongList";

import styles from "./CreateSongPresentationPage.module.css";
import { getSongOverview } from "../../types/song";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import type { ButtonConfig } from "../../components/ButtonBar/ButtonBar.types";
import { useSongEditor } from "../../hooks/useSongEditor";
import { useResizablePanels } from "./useResizablePanels";
import { useMemo, useRef } from "react";
import SettingsPanel from "../../components/SettingsPanel/SettingsPanel";
import { useResizer } from "../../hooks/useResizer";



export default function CreateSongPresentationPage() {
    const {
        selectedSong,
        songs,
        handleTitleUpdate,
        handleLanguage1Update,
        handleLanguage2Update,
        handleLyrics1Update,
        handleLyrics2Update,
        handleSelectSong,
        handleAddSong,
        handleDeleteSong,
        handleReorderSongs,
    } = useSongEditor();

    const containerRef = useRef<HTMLDivElement>(null);
    const { attachResize } = useResizer(containerRef);
    const {
        pageStyles,
        resizeConfigs
    } = useResizablePanels();

    const songOverviews = useMemo(() => 
        songs.map(getSongOverview),
        [songs]
    )

    const buttons: ButtonConfig[] = [
        {
            label: "Create Presentation",
            onClick: () => {}
        },
    ]


    return (
        <div 
            className={styles.createSongPresentation}
            ref={containerRef}
            style={ pageStyles }>
                
            <div className={styles.mainRow}>
                <aside className={styles.songList}>
                    <SongList 
                        songs={songOverviews}
                        selectedSongId={selectedSong.id}
                        onAddSong={handleAddSong} 
                        onSelectSong={handleSelectSong}
                        onDeleteSong={handleDeleteSong}
                        onReorderSongs={handleReorderSongs} />
                </aside>
                <div className={styles.resizerVertical} onPointerDown={attachResize(resizeConfigs.songList)} />
                <main className={styles.songEditor}>
                    <SongInput
                        song={selectedSong}
                        onTitleChange={handleTitleUpdate}
                        onLanguage1Change={handleLanguage1Update}
                        onLyrics1Change={handleLyrics1Update}
                        onLanguage2Change={handleLanguage2Update}
                        onLyrics2Change={handleLyrics2Update}
                        onAddSong={handleAddSong} />
                </main>
                <div className={styles.resizerVertical} onPointerDown={attachResize(resizeConfigs.settings)} />
                <aside className={styles.settings}>
                    <SettingsPanel />
                </aside>
            </div>
            <div className={styles.resizerHorizontal} onPointerDown={attachResize(resizeConfigs.preview)} />
            <aside className={styles.previewTray}>
                <SlidePreviewTray />
            </aside>

            <footer>
                <ButtonBar buttons={buttons} />
            </footer>
        </div>
    )
}