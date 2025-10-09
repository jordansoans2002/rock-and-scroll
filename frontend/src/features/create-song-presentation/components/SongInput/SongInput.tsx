import { useState } from "react";
import DropdownTextInput from "../DropdownTextInput/DropdownTextInput";
import LyricsInput from "../LyricsInput/LyricsInput";

import styles from "./SongInput.module.css"

    export default function SongInput() {
        const [title, setTitle] = useState("");
        const [language1, setLanguage1] = useState("");
        const [lyrics1, setLyrics1] = useState("");
        const [language2, setLanguage2] = useState("");
        const [lyrics2, setLyrics2] = useState("");
        
        return (
            <div className={styles.songInputWrapper}>
                <DropdownTextInput
                    suggestions={["a",'b','c']}
                    value={title}
                    onChange={(value) => setTitle(value)} />
                
                <div className={styles.lyricsContainer}>
                    <LyricsInput 
                        language={language1}
                        onLanguageChange={setLanguage1}
                        languageSuggestions={["ABC", "BCD"]}
                        lyrics={lyrics1}
                        onLyricsChange={setLyrics1}
                        onSave={() => {}}
                        onReset={() => {}}
                        onUploadFile={() => {}}/>

                    <LyricsInput 
                        language={language2}
                        onLanguageChange={setLanguage2}
                        languageSuggestions={["ABC", "BCD"]}
                        lyrics={lyrics2}
                        onLyricsChange={setLyrics2}
                        onSave={() => {}}
                        onReset={() => {}}
                        onUploadFile={() => {}}/>
                </div>
            </div>
        )
    }