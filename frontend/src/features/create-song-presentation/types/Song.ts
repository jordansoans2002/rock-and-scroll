
export interface Song {
    id: string;
    title: string,
    language1: string;
    language2?: string;
    lyrics1: string;
    lyrics2?: string;
    orientation: 'stacked' | 'sideBySide';
}

export type SongOverview = Pick<Song, "id" | "title" | "orientation"> & {
    languages: string[]
}

export const getSongOverview = (song: Song): SongOverview => {
    const languages = [song.language1];
    if(song.language2) {
        languages.push(song.language2);
    }

    return {
        id: song.id,
        title: song.title,
        languages,
        orientation: song.orientation,
    }
}

export const getBlankSong = (): Song => {
    return {
    id: `song_${crypto.randomUUID()}`,
    title: "",
    language1: "",
    lyrics1: "",
    orientation: "sideBySide"
}
}