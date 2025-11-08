import PreviewTray from "../../components/SongPreviewComponents/PreviewTray/PreviewTray";
import SongInput from "../../components/SongEditorComponents/SongInput/SongInput";
import SongList from "../../components/SongListComponents/SongList/SongList";

import styles from "./CreateSongPresentationPage.module.css";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import type { ButtonConfig } from "../../components/ButtonBar/ButtonBar";
import SettingsPanel from "../../components/SettingsComponents/SettingsPanel/SettingsPanel";
import { useSongPresentationState } from "../../hooks/useCreateSongPresentationState";




export default function CreateSongPresentationPage() {
    const {
        // songs,
        // selectedSongId,
        selectedSong,
        songOverviews,
        presentationSettings,
        defaultSongSettings,

        handleTitleUpdate,
        handleLanguage1Update,
        handleLanguage2Update,
        handleLyrics1Update,
        handleLyrics2Update,

        handleSelectSong,
        handleAddSong,
        handleDeleteSong,
        handleReorderSongs,

        updatePresentationSettings,
        updateDefaultSongSettings,

        selectedSongSettings,
        updateSelectedSongSettings,

        handleCreatePresentation,
        // isCreating,
        // creationError,
        // clearCreationError,

        activeView,
        toggleActiveView,
        minimizePanel,

        containerRef,
        stylesWidth,
        resizeSongList,
        resizeSettings,
        resizePreview,

        isPreviewOpen,
        togglePreview,
        minimizePreview
    } = useSongPresentationState();
       


    const buttons: ButtonConfig[] = [
        {
            label: "Show Preview",
            onClick: togglePreview
        },
        {
            label: "Create Presentation",
            onClick: handleCreatePresentation
        },
    ]

    const settingButtons: ButtonConfig[] = [
        {
            label: "Presentation Settings",
            onClick: () => { toggleActiveView("presentation") }
        },
        {
            label: "Song Settings",
            onClick: () => { toggleActiveView("song") }
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
                                    activeView={ activeView }
                                    minimizePanel={ minimizePanel }

                                    presentationSettings={presentationSettings}
                                    onUpdatePresentationSettings={updatePresentationSettings}

                                    defaultSongSettings={defaultSongSettings}
                                    onUpdateDefaultSongSettings={updateDefaultSongSettings}
                                    
                                    selectedSongSettings={selectedSongSettings}
                                    onUpdateSongSettings={ updateSelectedSongSettings }/>
                            </aside>
                    </> }
                </div>
                { isPreviewOpen && <>
                    <div className={styles.resizerHorizontal} onPointerDown={resizePreview} />
                    <aside className={styles.previewTray}>
                        <PreviewTray
                            song={selectedSong}
                            presentationSettings={presentationSettings}
                            minimizePreview={minimizePreview} />
                    </aside>
                </>}
                

                <footer className={styles.footer}>
                    <ButtonBar orientation="horizontal" endGroup={buttons} />
                </footer>
            </div>

            <ButtonBar orientation="vertical" startGroup={settingButtons} />
        </div>
    )
}