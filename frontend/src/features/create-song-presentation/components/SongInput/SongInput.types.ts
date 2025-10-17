import type { Song } from "../../types/Song";

export interface SongInputProps{
    song: Song;
    onTitleChange: (value: string) => void;
    onLanguage1Change: (value: string) => void;
    onLyrics1Change: (value: string) => void;
    onLanguage2Change: (value: string) => void;
    onLyrics2Change: (value: string) => void;
    onAddSong: () => void;
}