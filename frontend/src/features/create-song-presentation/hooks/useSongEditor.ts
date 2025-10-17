import { useState, useCallback } from "react";
import { getBlankSong, type Song, type SongOverview } from "../types/Song";


export const useSongEditor = () => {
    const [selectedSong, setSelectedSong] = useState<Song>(getBlankSong);
    const [songs, setSongs] = useState<Song[]>([selectedSong]);

    const updateSongField = useCallback((field: keyof Song, value: any, updateOverview: boolean = false) => {
        const updatedSong = { ...selectedSong, [field]: value };
        setSelectedSong(updatedSong);

        if(updateOverview) {
            setSongs((prevSongs) => 
                prevSongs.map((s) => s.id === selectedSong.id ? updatedSong : s)
            )
        }
    },[selectedSong])

    const handleTitleUpdate = useCallback((title: string) => {
        updateSongField('title', title, true);
    }, [updateSongField]);
    
    const handleLanguage1Update = useCallback((lang1: string) => {
        updateSongField('language1', lang1, true);
    },[updateSongField]);
    const handleLanguage2Update = useCallback((lang2: string) => {
        updateSongField('language2', lang2, true);
    },[updateSongField]);

    const handleLyrics1Update = useCallback((lyrics1: string) => {
        updateSongField('lyrics1', lyrics1, false);
    }, [updateSongField]);
    const handleLyrics2Update = useCallback((lyrics2: string) => {
        updateSongField('lyrics2', lyrics2, false);
    }, [selectedSong]);

    const handleSelectSong = useCallback((id: string) => {
        const song = songs.find(s => s.id === id);
        if(song) {
            setSelectedSong(song);
        }
    }, [songs]);

    const handleAddSong = useCallback(() => {
        const newSong = getBlankSong()
        setSongs((prev) => [...prev, newSong]);
        setSelectedSong(newSong);
    }, []);

    const handleDeleteSong = useCallback((id: string) => {
        setSongs((prevSongs) => {
            const deleteIndex = prevSongs.findIndex((song) => song.id === id);
            const updatedSongs = prevSongs.filter((song) => song.id !== id);
        
            if(selectedSong.id === id) {
                if(updatedSongs.length === 0) {
                    const song = getBlankSong()
                    updatedSongs.push(song);
                    setSelectedSong(song);
                } else if(deleteIndex === updatedSongs.length) {
                    setSelectedSong(updatedSongs[updatedSongs.length -1]);
                } else {
                    setSelectedSong(updatedSongs[deleteIndex]);
                }
            }
            
            return updatedSongs;
        });
    }, [selectedSong]);

    const handleReorderSongs = useCallback((reorderOverviews: SongOverview[]) => {
        setSongs((prevSongs) => {
            const reorderedIds = reorderOverviews.map((o) => o.id);
            return reorderedIds.map((id) => prevSongs.find((s) => s.id === id)!)
        });
    }, []);

    return {
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
    }
}