export interface LyricsInputProps {
    language?: string;
    onLanguageChange: (value: string) => void;
    languageSuggestions: string[];

    lyrics?: string;
    onLyricsChange: (value: string) => void;

    onSave: () => void;
    onReset: () => void;
    onUploadFile: () => void;
}