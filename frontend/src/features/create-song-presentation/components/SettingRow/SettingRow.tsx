
import styles from "./SettingRow.module.css"

interface SettingRowProps {
    label: string;
    description?: string;
    children: React.ReactNode;
    resize: (ev: React.PointerEvent<Element>) => void
}


export default function SettingRow({
    label,
    description,
    children,
    resize
}: SettingRowProps) {

    return (
        <div className={styles.row}>
            <p className={styles.labelColumn}>{label}</p>
            
            <div className={styles.resizerVertical} onPointerDown={resize}></div>
            
            <div className={styles.valueColum}>
                {children}
            </div>
        </div>
    )
}