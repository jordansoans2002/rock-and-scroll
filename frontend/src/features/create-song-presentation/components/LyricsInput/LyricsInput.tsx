import { useCallback } from "react";
import DropdownTextInput from "../DropdownTextInput/DropdownTextInput";

import type { LyricsInputProps } from "./LyricsInput.types";
import ButtonBar, { ButtonConfig } from "../ButtonBar/ButtonBar";

import styles from "./LyricsInput.module.css"

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

    const startButtons: ButtonConfig[] = [
        {
            label: "Upload",
            onClick: onUploadFile
        }
    ]
    const endButtons: ButtonConfig[] = [
        {
            label: "Save",
            onClick: onSave
        },
        {
            label: "Reset",
            onClick: onReset
        },
    ]

    return(
        <div className={styles.lyricsInputWrapper}>
            <DropdownTextInput
                placeholder="Language"
                suggestions={languageSuggestions}
                value={language}
                onChange={onLanguageChange}
                className={styles.dropdownInput} />
            
            <textarea 
                value={lyrics}
                onChange={handleTextAreaChange}
                className={styles.lyricsInput} />

            <div className={styles.buttonSection}>
                <ButtonBar orientation="horizontal" startGroup={startButtons} endGroup={endButtons} />
            </div>
        </div>
    )
}