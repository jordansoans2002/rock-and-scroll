
import styles from "./SettingRow.module.css"
import topLevelStyle from "../SettingsRenderer/SettingsRenderer.module.css"

interface SettingRowProps {
    label: string;
    topLevel: boolean;
    description?: string;
    children: React.ReactNode;
    resize: (ev: React.PointerEvent<Element>) => void
}


export default function SettingRow({
    label,
    topLevel,
    description,
    children,
    resize
}: SettingRowProps) {
    return (
        <div className={styles.row}>
            <p className={`${styles.labelColumn} ${topLevel && topLevelStyle.topLevelLabel}`}>{label}</p>
            
            <div className={styles.resizerVertical} onPointerDown={resize}></div>
            
            <div className={styles.valueColumn}>
                {children}
            </div>
        </div>
    )
}