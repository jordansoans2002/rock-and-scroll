import ButtonBar, { ButtonConfig } from "../../ButtonBar/ButtonBar"
import styles from "./PreviewTray.module.css"

interface PreviewTrayProps {
    minimizePreview: () => void;
}

export default function PreviewTray({
    minimizePreview,
}: PreviewTrayProps) {
    const minimize: ButtonConfig = {
        icon: <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true">
            <line x1="3" y1="13" x2="13" y2="13" stroke={"currentColor"} strokeWidth={2} strokeLinecap="round" />
        </svg>,
        onClick: minimizePreview,
        className: styles.minimizeButton
    }

    return (
        <div className={styles.tray}>
            <div className={styles.titleBar}>
                <span className={styles.title}>{"Song Preview"}</span>
                <div className={styles.titleBarActions}>
                    <ButtonBar orientation="horizontal" endGroup={[minimize]} />
                </div>
            </div>
        </div>
    )
}