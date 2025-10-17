import type { SongOverview } from "../../types/Song";

export interface SongOverviewProps {
    song: SongOverview;
    isSelected: boolean;
    isDragging: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    index: number;
    draggableId: string;
}