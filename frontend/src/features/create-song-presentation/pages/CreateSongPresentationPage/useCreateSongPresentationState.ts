import { useCallback, useMemo, useState } from "react"
import { getBlankSong, getSongOverview } from "../../types/song"
import { PresentationSettings, Song, SongSettings } from "@rock-and-scroll/shared/types/settings";
import { useSongEditor } from "./useSongEditor";
import { useSongList } from "./useSongList";
import { useResizablePanels } from "./useResizablePanels";
import { DEFAULT_PRESENTATION_SETTINGS, DEFAULT_SONG_SETTINGS } from "@rock-and-scroll/shared/defaults/defaultSettings";
import { useSettingPanelUI } from "./useSettingPanelUI";
import { usePresentationSettings } from "./usePresentationSettings";
import { useSongSettings } from "./useSongSettings";
import { loadFromStorage, STORAGE_KEYS } from "../../../../utils/local-storage";
import { usePersistentState } from "../../hooks/usePersistantState";
import { useCreatePresentation } from "../../hooks/useCreatePresentation";

export const useSongPresentationState = () => {
    const [songs, setSongs] = useState<Song[]>(() => {
        const storedDefaults = loadFromStorage(
            STORAGE_KEYS.DEFAULT_SONG_SETTINGS,
            DEFAULT_SONG_SETTINGS
        );
        return [getBlankSong(storedDefaults)];
    });

    const [selectedSongId, setSelectedSongId] = useState<string>(songs[0].id);

    const [presentationSettings, setPresentationSettings] = usePersistentState<PresentationSettings>(
        STORAGE_KEYS.PRESENTATION_SETTINGS,
        DEFAULT_PRESENTATION_SETTINGS,
        500 //ms
    );

    const [defaultSongSettings, setDefaultSongSettings] = usePersistentState<SongSettings>(
        STORAGE_KEYS.DEFAULT_SONG_SETTINGS,
        DEFAULT_SONG_SETTINGS,
        500 //ms
    );

    const selectedSong = useMemo<Song>(
        () => {
            const song = songs.find(s => s.id === selectedSongId);

            if(song) 
                return song;

            if(songs.length > 0) {
                return songs[songs.length - 1];
            }

            const blankSong = getBlankSong(defaultSongSettings);
            setSongs([blankSong]);
            setSelectedSongId(blankSong.id);
            return blankSong;
        },
        [songs, selectedSongId]
    );

    const songOverviews = useMemo(() => 
        songs.map(getSongOverview),
        [songs]
    );

    const editSongHandlers = useSongEditor({
        songs,
        selectedSong,
        setSongs
    });

    const songListHandlers = useSongList({
        songs,
        selectedSong,
        setSongs,
        setSelectedSongId,
        defaultSongSettings,
    });

    const presentationSettingsHandlers = usePresentationSettings({
        presentationSettings,
        setPresentationSettings,
        defaultSongSettings,
        setDefaultSongSettings,
    });

    const songSettingsHandlers = useSongSettings({
        songs,
        selectedSong,
        setSongs,
    })

    const {
        createPresentation,
        isCreating,
        error: creationError,
        clearError: clearCreationError,
    } = useCreatePresentation();

    const handleCreatePresentation = useCallback(
        async () => {
            try {
                console.log("creating presentation");
                await createPresentation(songs, presentationSettings);
            } catch (error) {
                // Component to show error
            }
        },
        [songs, presentationSettings, createPresentation]
    );

    const settingsPanelUI = useSettingPanelUI();

    const panelResizeHandlers = useResizablePanels();

    

    return {
        songs,
        selectedSongId,
        selectedSong,
        songOverviews,

        presentationSettings,
        defaultSongSettings,

        ...editSongHandlers,
        ...songListHandlers,
        ...presentationSettingsHandlers,
        ...songSettingsHandlers,

        handleCreatePresentation,
        isCreating,
        creationError,
        clearCreationError,

        ...settingsPanelUI,
        ...panelResizeHandlers,
    }
}