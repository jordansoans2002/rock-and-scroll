export interface TextStyle {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    align: "left" | "center" | "right" | "justify";
    vAlign: "top" | "middle" | "bottom";
}

export interface Background {
    color: string;
}

export interface Padding {
    left: number;
    top: number;
    right: number;
    bottom: number;
    gap: number;
}

export interface Separation {
    symbol?: string | null;
    lines?: number | null;
}

export interface SongSettings {
    separation: Separation;
    orientation: "stacked" | "sideBySide";
    stanzas: number[];
    padding: Padding;
    text1Style: TextStyle;
    text2Style: TextStyle;
    background: Background;
}

export interface PresentationSettings {
    slideRatio: "16x9" | "4x3";
    unit: "in" | "cm" | "px";
    titleStyle: TextStyle;
}

export interface Song {
    title: string;
    text: {
        text1: string;
        text2: string | null;
    }
    settings: SongSettings;
}

export interface GeneratePresentationRequest {
    settings: PresentationSettings;
    songs: Song[];
}