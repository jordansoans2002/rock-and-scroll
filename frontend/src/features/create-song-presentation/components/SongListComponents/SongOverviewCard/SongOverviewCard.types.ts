import type { SongOverview } from "../../../types/song";

export interface SongOverviewProps {
    song: SongOverview;
    isSelected: boolean;
    isDragging: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    index: number;
    draggableId: string;
}