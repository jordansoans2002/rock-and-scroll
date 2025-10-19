import { useState, useCallback } from "react";
import { Song } from "@rock-and-scroll/shared/types/settings";
import { getBlankSong, SongOverview } from "../types/song";


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
        updateSongField('lang1', lang1, true);
    },[updateSongField]);
    const handleLanguage2Update = useCallback((lang2: string) => {
        updateSongField('lang2', lang2, true);
    },[updateSongField]);

    const handleLyrics1Update = useCallback((lyrics1: string) => {
        if(lyrics1.trim() === "")
            updateSongField('text1', null, false);
        else
            updateSongField('text1', lyrics1, false);
    }, [updateSongField]);
    const handleLyrics2Update = useCallback((lyrics2: string) => {
        if(lyrics2.trim() === "")
            updateSongField('text2', null, false);
        else
            updateSongField('text2', lyrics2, false);
    }, [updateSongField]);

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