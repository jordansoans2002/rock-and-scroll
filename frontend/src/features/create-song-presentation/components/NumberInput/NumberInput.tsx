import styles from "./NumberInput.module.css"
import baseStyles from "../SettingsPanel/SettingsPanel.module.css"
import { SETTINGS_METADATA } from "@rock-and-scroll/shared/types/settingsMetadata"

interface NumberInputProps {
    setting: SETTINGS_METADATA,
    value: number,
    onChange: (value: number) => void
}

export default function NumberInput({
    setting,
    value,
    onChange,
}: NumberInputProps) {
    return(
        <div className={styles.numberSetting}>
            <input
                type="number"
                value={value}
                onChange={() => {}}
                onBlur={() => {}}
                min={setting.min}
                max={setting.max}
                step={setting.step || 1}
                className={`${styles.input} `} />

            <div className={styles.spinners}>
                <button
                    type="button"
                    onClick={() => {}}
                    className={styles.spinnerButton}
                    disabled={false}
                    aria-label="Increase value">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <polyline points="18 15 12 9 6 15" />
                        </svg> 
                </button>
                <button
                    type="button"
                    onClick={() => {}}
                    className={styles.spinnerButton}
                    disabled={false}
                    aria-label="Decrease value">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                </button>
            </div>
        </div>
    )
}