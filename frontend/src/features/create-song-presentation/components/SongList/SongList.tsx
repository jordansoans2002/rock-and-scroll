import { useCallback, useEffect, useState } from "react";
import SongOverviewCard from "../SongOverviewCard/SongOverviewCard";
import type { SongListProps } from "./SongList.types";
import type { SongOverview } from "../../types/song";

import styles from "./SongList.module.css"

export default function SongList({
    songs,
    selectedSongId,
    onAddSong,
    onSelectSong,
    onDeleteSong,
    onReorderSongs,
    className = '',
}: SongListProps) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
    const [songList, setSongList] = useState<SongOverview[]>(songs);

    useEffect(() => {
        setSongList(songs);
    }, [songs]);

    // verify and improve
    const handleDragStart = useCallback((index: number) => {
        setDraggedIndex(index);
    }, []);

    const handleDragOver = useCallback(
        (e: React.DragEvent, index: number) => {
            e.preventDefault();
            setDraggedOverIndex(index);
        },
        []
    );

    const handleDragLeave = useCallback(() => {
        setDraggedOverIndex(null);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent, dropIndex: number) => {
            e.preventDefault();
            
            if(draggedIndex == null || draggedIndex === dropIndex) {
                setDraggedIndex(null);
                setDraggedOverIndex(null);
                return;
            }

            const newList = [...songList];
            const [draggedItem] = newList.splice(draggedIndex, 1);
            newList.splice(dropIndex, 0, draggedItem);

            setSongList(newList);
            onReorderSongs(newList);

            setDraggedIndex(null);
            setDraggedOverIndex(null);
        },
        [draggedIndex, draggedOverIndex, onReorderSongs]
    );

    const handleDragEnd = useCallback(() => {
        setDraggedIndex(null);
        setDraggedOverIndex(null);
    }, []);


    return (
        <div className={`${styles.listContainer} ${className}`}>
            <div className={styles.list}>
                {songList.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No songs yet. Search for a song or input lyrics to get started</p>
                    </div>
                ): (
                    songList.map((song, index) => (
                        <div
                            key={song.id}
                            className={`${styles.cardWrapper} ${
                                draggedOverIndex === index ? styles.cardWrapperDragOver : ""
                            }`}
                            onDragStart={() => handleDragStart(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index)}>

                            <SongOverviewCard
                                song={song}
                                isSelected={selectedSongId === song.id}
                                isDragging={draggedIndex === index}
                                onSelect={onSelectSong}
                                onDelete={onDeleteSong}
                                index={index}
                                draggableId={`song-${song.id}`} />
                        </div>
                    ))
                )}
            </div>

            <button 
                type="button"
                onClick={onAddSong} 
                aria-label="Add new song"
                className={styles.addSongButton}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    )
}