import type { ButtonBarProps } from "./ButtonBar.types";

import styles from "./ButtonBar.module.css"

export default function ButtonBar({
    buttons,
    className = ''
}: ButtonBarProps) {
    return(
        <div className={`${styles.buttonBar} ${className}`}>
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={button.onClick}
                    disabled={button.disabled}>
                        
                    {button.label}
                </button>
            ))}
        </div>
    );
}