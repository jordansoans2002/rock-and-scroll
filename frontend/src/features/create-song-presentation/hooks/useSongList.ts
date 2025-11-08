import { useCallback } from "react";
import { getBlankSong, SongOverview } from "../types/song";
import { Song, SongSettings } from "@rock-and-scroll/shared/types/settings";

interface UseSongListParams {
    songs: Song[];
    selectedSong: Song;
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
    setSelectedSongId: React.Dispatch<React.SetStateAction<string>>;
    defaultSongSettings: SongSettings;
}

export const useSongList = ({
    selectedSong,
    setSongs,
    setSelectedSongId,
    defaultSongSettings,
}: UseSongListParams) => {

    const handleSelectSong = useCallback(
        (id: string) => {
            setSelectedSongId(id)
        },
        [setSelectedSongId]
    );

    const handleAddSong = useCallback(
        () => {
            const newSong = getBlankSong(defaultSongSettings);
            setSongs((prevSongs) => [...prevSongs, newSong]);
            setSelectedSongId(newSong.id);
        },
        [setSongs, setSelectedSongId, defaultSongSettings]
    );

    const handleDeleteSong = useCallback(
        (id: string) => {
            setSongs((prevSongs) => {
                const deleteIndex = prevSongs.findIndex((song) => song.id === id);
                const updatedSongs = prevSongs.filter((song) => song.id !== id);
            
                if(selectedSong.id === id) {
                    if(updatedSongs.length === 0) {
                        const song = getBlankSong(defaultSongSettings);
                        updatedSongs.push(song);
                        setSelectedSongId(song.id);
                    } else if(deleteIndex === updatedSongs.length) {
                        setSelectedSongId(updatedSongs[updatedSongs.length -1].id);
                    } else {
                        setSelectedSongId(updatedSongs[deleteIndex].id);
                    }
                }
                
                return updatedSongs;
            });
        }, [selectedSong.id, setSongs, setSelectedSongId, defaultSongSettings]);

    const handleReorderSongs = useCallback(
        (reorderOverviews: SongOverview[]) => {
            setSongs((prevSongs) => {
                const reorderedIds = reorderOverviews.map((o) => o.id);
                return reorderedIds.map((id) => 
                    prevSongs.find((s) => s.id === id)!
                );
            });
        },
        [setSongs]
    );

    return {
        handleSelectSong,
        handleAddSong,
        handleDeleteSong,
        handleReorderSongs,
    }
}