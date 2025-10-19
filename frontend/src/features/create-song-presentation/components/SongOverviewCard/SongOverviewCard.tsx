
import { useCallback } from "react"
import type { SongOverviewProps } from "./SongOverviewCard.types"

import styles from "./SongOverviewCard.module.css"

export default function SongOverviewCard({
    song,
    isSelected,
    isDragging,
    onSelect,
    onDelete,
    index,
    draggableId
}: SongOverviewProps) {
    const handleDelete = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onDelete(song.id);
        },
        [song.id, onDelete]
    );

    const handleClick = useCallback(() => {
        onSelect(song.id)
    }, [song.id, onSelect]);

    const displayName = song.title;
    const languagesText = song.languages.join(", ");
    const orientationText = song.orientation === 'stacked' ? "Stacked" : "Side by side";

    const cardClasses = [
        styles.card,
        isSelected && styles.cardSelected,
        isDragging && styles.cardDragging,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            onClick={handleClick}
            draggable
            data-index={index}
            data-draggable-id={draggableId}
            className={cardClasses}>

                <div className={styles.dragHandle}>
                    <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">

                    <circle cx="9" cy="5" r="1" />
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="9" cy="19" r="1" />
                    <circle cx="15" cy="5" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <circle cx="15" cy="19" r="1" />
                    </svg>
                </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{displayName}</h3>
                <p className={styles.info}>
                    <span className={styles.info}>Languages:</span> {languagesText} 
                </p>
                <p className={styles.info}>
                    <span className={styles.info}>Orientation:</span> {orientationText}
                </p>
            </div>

            <button
                className={styles.deleteButton}
                onClick={handleDelete}
                aria-label={`Delete song: ${displayName}`}
                type="button">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
            </button>
        </div>
    )
}