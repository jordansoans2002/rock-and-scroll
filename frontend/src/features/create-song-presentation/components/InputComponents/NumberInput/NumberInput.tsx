import styles from "./NumberInput.module.css"
import { SETTINGS_METADATA } from "@rock-and-scroll/shared/types/settingsMetadata"
import { useCallback, useState } from "react"
import React from "react"

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

    const [inputValue, setInputValue] = useState(value.toString());

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setInputValue(newValue);

            const parsed = parseFloat(newValue);
            if(!isNaN(parsed)) {
                let clamped = parsed;
                if(setting.min !== undefined) clamped = Math.max(setting.min, clamped);
                if(setting.max !== undefined) clamped = Math.min(setting.max, clamped);
                onChange(clamped);
            }
        },
        [setting.min, setting.max, onChange]
    )

    const handleBlur = useCallback(() => {
            const parsed = parseFloat(inputValue);
            if(isNaN(parsed)) {
                setInputValue(value.toString())
            } else {
                let clamped = parsed;
                if(setting.min !== undefined) clamped = Math.max(setting.min, clamped);
                if(setting.max !== undefined) clamped = Math.min(setting.max, clamped);
                setInputValue(clamped.toString());
                if(clamped != value) {
                    onChange(clamped);
                }
            }
    }, [inputValue, value, setting.min, setting.max, onChange]);

    const handleIncrement = useCallback(() => {
        const step = setting.step || 1;
        const newValue = value + step;
        const clamped = setting.max !== undefined ? Math.min(setting.max, newValue) : newValue;
        onChange(clamped);
        setInputValue(clamped.toString());
    }, [value, setting.step, setting.max, onChange]);
    const handleDecrement = useCallback(() => {
        const step = setting.step || 1;
        const newValue = value - step;
        const clamped = setting.min !== undefined ? Math.max(setting.min, newValue) : newValue;
        onChange(clamped);
        setInputValue(clamped.toString());
    }, [value, setting.step, setting.min, onChange]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    onChange(value - 1);
                    break;
                
                    case 'ArrowUp':
                        e.preventDefault();
                        onChange(value + 1);
                        break;
            }
        },
        [onChange]
    )

    React.useEffect(() => {
        setInputValue(value.toString());
    }, [value]);
    
    return(
        <div className={styles.numberSetting}>
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                min={setting.min}
                max={setting.max}
                step={setting.step || 1}
                className={`${styles.input} `} />

            <div className={styles.spinners}>
                <button
                    type="button"
                    onClick={handleIncrement}
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
                    onClick={handleDecrement}
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