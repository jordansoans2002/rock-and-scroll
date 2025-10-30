import { useState, useCallback, useMemo } from "react";
import { Song, SongSettings } from "@rock-and-scroll/shared/types/settings";
import { getBlankSong, SongOverview } from "../../types/song";

interface UseSongEditorParams {
    songs: Song[];
    selectedSong: Song;
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

export const useSongEditor = ({
    songs,
    selectedSong,
    setSongs,
}: UseSongEditorParams) => {

    const updateSongField = useCallback(
        (field: keyof Song, value: any, updateOverview: boolean = false) => {
            setSongs((prevSongs) => {
                const updateIndex = prevSongs.findIndex(s => s.id === selectedSong.id);
                
                if(updateIndex === -1) return prevSongs;

                const updatedSong = {...prevSongs[updateIndex], [field]: value};

                if(updateOverview) {
                    // each song object is mapped to a new song object
                    return prevSongs.map((s, idx) => idx === updateIndex ? updatedSong : s);
                } else {
                    const newSongs = [...prevSongs]
                    newSongs[updateIndex] = updatedSong;
                    return newSongs;
                }
            });
        },
        [selectedSong.id, setSongs]
    );

    const handleTitleUpdate = useCallback(
        (title: string) => {
            updateSongField('title', title, true);
        },
        [updateSongField]
    );
    

    const handleLanguage1Update = useCallback(
        (lang1: string) => {
            updateSongField('lang1', lang1, true);
        },
        [updateSongField]
    );

    const handleLanguage2Update = useCallback(
        (lang2: string) => {
            updateSongField('lang2', lang2, true);
        },
        [updateSongField]
    );


    const handleLyrics1Update = useCallback(
        (lyrics1: string) => {
            updateSongField(
                'text1',
                lyrics1.trim() === '' ? null : lyrics1,
                false
            );
        }, 
        [updateSongField]
    );

    const handleLyrics2Update = useCallback(
        (lyrics2: string) => {
            updateSongField(
                'text2',
                lyrics2.trim() === '' ? null : lyrics2,
                false
            );
        }, 
        [updateSongField]
    );

    return {
        handleTitleUpdate,
        handleLanguage1Update,
        handleLanguage2Update,
        handleLyrics1Update,
        handleLyrics2Update,
    }
}