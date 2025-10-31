import styles from "./ButtonBar.module.css"

export interface ButtonConfig {
    label?: string;
    icon?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

interface ButtonBarProps {
    startGroup?: ButtonConfig[];
    endGroup?: ButtonConfig[];
    orientation: "horizontal" | "vertical";
    className?: string;
}

export default function ButtonBar({
    startGroup,
    endGroup,
    orientation,
    className = ''
}: ButtonBarProps) {
    return(
        <div className={`${className} ${styles.buttonBar} ${orientation === "horizontal" ? styles.horizontalButtonBar : styles.verticalButtonBar}`}>
            <div className={`${styles.group} ${orientation === "horizontal" ? styles.startGroupHorizontal : styles.startGroupVertical}`}>
                { startGroup && startGroup.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.onClick}
                        disabled={button.disabled}
                        className={`${styles.button} ${button.className ?? ""} ${orientation === "vertical" ? styles.verticalButton : ""}`}>
                        {button.icon && <span className={styles.icon}>{button.icon}</span>}
                        {button.label && <span className={styles.label}>{button.label}</span>}
                    </button>
                ))}
            </div>
            <div className={`${styles.group} ${styles.endGroup}`}>
                { endGroup && endGroup.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.onClick}
                        disabled={button.disabled}                        
                        className={`${styles.button} ${orientation === "vertical" ? styles.verticalButton : ""}`}>
                        {button.icon && <span className={styles.icon}>{button.icon}</span>}
                        {button.label && <span className={styles.label}>{button.label}</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}