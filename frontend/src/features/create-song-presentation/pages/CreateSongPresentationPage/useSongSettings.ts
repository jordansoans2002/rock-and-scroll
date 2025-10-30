import { Song, SongSettings } from "@rock-and-scroll/shared/types/settings";
import { useCallback, useMemo } from "react";


interface UseSongSettingsParams {
    songs: Song[];
    selectedSong: Song;
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

export const useSongSettings = ({
    songs,
    selectedSong,
    setSongs,
}: UseSongSettingsParams) => {

    const selectedSongSettings = useMemo<SongSettings>(
        () => selectedSong.settings,
        [selectedSong]
    );

    const updateSelectedSongSettings = useCallback(
        (newSettings: SongSettings) => {
            setSongs((prevSongs) => {
                return prevSongs.map((song) => {
                    if(song.id === selectedSong.id){
                        return {
                            ...song,
                            settings: newSettings
                        };
                    }
                    return song;
                })
            })
        },
        [selectedSong.id, setSongs]
    );

    return {
        selectedSongSettings,
        updateSelectedSongSettings,
    }
}