import { DEFAULT_SONG_SETTINGS } from "@rock-and-scroll/shared/defaults/defaultSettings";
import { Song, SongSettings } from "@rock-and-scroll/shared/types/settings";

export type SongOverview = {
    id: string,
    title: string;
    languages: string[];
    orientation: SongSettings["orientation"];
}

export const getSongOverview = (song: Song): SongOverview => {
    const languages = [];
    if(song.lang1)
        languages.push(song.lang1);
    if(song.lang2) 
        languages.push(song.lang2);

    return {
        id: song.id,
        title: song.title || "Untitled",
        languages,
        orientation: song.settings.orientation,
    }
}

export const getBlankSong = (): Song => {
    return {
        id: `song_${crypto.randomUUID()}`,
        title: "",
        lang1: null,
        text1: null,
        lang2: null,
        text2: null,
        settings: DEFAULT_SONG_SETTINGS
    }
}