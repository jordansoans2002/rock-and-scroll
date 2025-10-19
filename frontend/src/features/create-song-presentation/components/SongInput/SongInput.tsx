import DropdownTextInput from "../DropdownTextInput/DropdownTextInput";
import LyricsInput from "../LyricsInput/LyricsInput";

import styles from "./SongInput.module.css"
import type { SongInputProps } from "./SongInput.types";

export default function SongInput({
    song,
    onTitleChange,
    onLanguage1Change,
    onLyrics1Change,
    onLanguage2Change,
    onLyrics2Change,
    onAddSong,
}: SongInputProps) {
    
    
    return (
        <div className={styles.songInputWrapper}>
            <div className={styles.titleInputWrapper}>
                <DropdownTextInput
                    suggestions={["a",'b','c']}
                    value={song.title}
                    onChange={onTitleChange}
                    className={styles.dropdownInput} />
                <button
                    onClick={onAddSong}
                    className={styles.addSongButton}>
                    Add song
                </button>
            </div>

            <div className={styles.lyricsContainer}>
                <LyricsInput 
                    language={song.lang1 || ""}
                    onLanguageChange={onLanguage1Change}
                    languageSuggestions={["ABC", "BCD"]}
                    lyrics={song.text1 || ""}
                    onLyricsChange={onLyrics1Change}
                    onSave={() => {}}
                    onReset={() => {}}
                    onUploadFile={() => {}}/>

                <LyricsInput 
                    language={song.lang2 || ""}
                    onLanguageChange={onLanguage2Change}
                    languageSuggestions={["ABC", "BCD"]}
                    lyrics={song.text2 || ""}
                    onLyricsChange={onLyrics2Change}
                    onSave={() => {}}
                    onReset={() => {}}
                    onUploadFile={() => {}}/>
            </div>
        </div>
    )
}