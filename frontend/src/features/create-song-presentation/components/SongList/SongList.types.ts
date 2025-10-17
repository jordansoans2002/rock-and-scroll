import type { SongOverview } from "../../types/Song";

export interface SongListProps {
    songs: SongOverview[];
    selectedSongId: string | null;
    onAddSong: () => void;
    onSelectSong: (id: string) => void;
    onDeleteSong: (id: string) => void;
    onReorderSongs: (songs: SongOverview[]) => void;
    className?: string;
}