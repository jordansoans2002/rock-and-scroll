import SlidePreviewTray from "../../components/SlidePreviewTray/SlidePreviewTray";
import SongInput from "../../components/SongInput/SongInput";
import SongList from "../../components/SongList/SongList";

import styles from "./CreateSongPresentationPage.module.css";
import { getSongOverview } from "../../types/song";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import type { ButtonConfig } from "../../components/ButtonBar/ButtonBar";
import { useSongEditor } from "./useSongEditor";
import { useResizablePanels } from "./useResizablePanels";
import { useMemo, useState } from "react";
import SettingsPanel from "../../components/SettingsPanel/SettingsPanel";
import { PRESENTATION_SETTINGS_METADATA } from "@rock-and-scroll/shared/types/settingsMetadata";
import { DEFAULT_PRESENTATION_SETTINGS, DEFAULT_SONG_SETTINGS } from "@rock-and-scroll/shared/defaults/defaultSettings";



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

    const {
        containerRef,
        stylesWidth,
        resizeSongList,
        resizeSettings,
        resizePreview
    } = useResizablePanels();

    const songOverviews = useMemo(() => 
        songs.map(getSongOverview),
        [songs]
    );

    const selectedSongSettings = useMemo(() => 
        selectedSong.settings,
        [selectedSong]
    );

    const [activeView, setActiveView] = useState<'presentation' | 'song' | null>(null); // TODO export as type
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const buttons: ButtonConfig[] = [
        {
            label: "Show Preview",
            onClick: () => {
                setIsPreviewOpen(!isPreviewOpen);
            }
        },
        {
            label: "Create Presentation",
            onClick: () => {
                console.log(songs);
            }
        },
    ]

    const settingButtons: ButtonConfig[] = [
        {
            label: "Presentation Settings",
            onClick: () => {
                if (activeView !== "presentation") {
                    setActiveView("presentation");
                } else {
                    setActiveView(null);
                }
            }
        },
        {
            label: "Song Settings",
            onClick: () => {
                if (activeView !== "song") {
                    setActiveView("song");
                } else {
                    setActiveView(null);
                }
            }
        },
    ]


    return (
        <div className={styles.createSongPresentation}>
            
            <div className={styles.mainContent}
                ref={containerRef}
                style={ stylesWidth }>

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
                    <div className={styles.resizerVertical} onPointerDown={resizeSongList} />
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
                    {activeView && <>
                            <div className={styles.resizerVertical} onPointerDown={resizeSettings} />
                            <aside className={styles.settings}>
                                <SettingsPanel 
                                    activeView={activeView}
                                    minimizePanel={()=>setActiveView(null)}
                                    songSettings={selectedSongSettings}
                                    onUpdateSongSettings={(songSettings) => selectedSong.settings = songSettings}/>
                            </aside>
                    </> }
                </div>
                { isPreviewOpen && <>
                    <div className={styles.resizerHorizontal} onPointerDown={resizePreview} />
                    <aside className={styles.previewTray}>
                        <SlidePreviewTray />
                    </aside>
                </>}
                

                <footer>
                    <ButtonBar orientation="horizontal" endGroup={buttons} />
                </footer>
            </div>

            <ButtonBar orientation="vertical" startGroup={settingButtons} />
        </div>
    )
}