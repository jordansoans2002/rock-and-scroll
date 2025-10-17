import { useCallback } from "react";
import DropdownTextInput from "../DropdownTextInput/DropdownTextInput";

import styles from "./LyricsInput.module.css"
import type { LyricsInputProps } from "./LyricsInput.types";
import type { ButtonConfig } from "../ButtonBar/ButtonBar.types";
import ButtonBar from "../ButtonBar/ButtonBar";

export default function LyricsInput({
    language = "",
    onLanguageChange,
    languageSuggestions = [],

    lyrics = "",
    onLyricsChange,

    onSave,
    onReset,
    onUploadFile,
}: LyricsInputProps) {

    const handleTextAreaChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onLyricsChange(e.target.value);
        },
        [onLyricsChange]
    )

    const buttons: ButtonConfig[] = [
        {
            label: "Save",
            onClick: onSave
        },
        {
            label: "Reset",
            onClick: onReset
        },
        {
            label: "Upload",
            onClick: onUploadFile
        }
    ]

    return(
        <div className={styles.lyricsInputWrapper}>
            <DropdownTextInput
                placeholder="Language"
                suggestions={languageSuggestions}
                value={language}
                onChange={onLanguageChange} />
            
            <textarea 
                value={lyrics}
                onChange={handleTextAreaChange}
                className={styles.lyricsInput} />

            <div className={styles.buttonSection}>
                <ButtonBar buttons={buttons} />
            </div>
        </div>
    )
}