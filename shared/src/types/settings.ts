export const ORIENTATIONS = {
    stacked: "stacked",
    sideBySide: "sideBySide",
} as const;
export type Orientation = typeof ORIENTATIONS[keyof typeof ORIENTATIONS];

export const HORIZONTAL_ALIGNMENTS = {
    left: "left",
    center: "center",
    right: "right",
    justify: "justify",
} as const;
export type HorizontalAlignment = typeof HORIZONTAL_ALIGNMENTS[keyof typeof HORIZONTAL_ALIGNMENTS]

export const VERTICAL_ALIGNMENTS = {
    top: "top",
    middle: "middle",
    bottom: "bottom"
} as const;
export type VerticalAlignment = typeof VERTICAL_ALIGNMENTS[keyof typeof VERTICAL_ALIGNMENTS];

export interface TextStyle {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    align: HorizontalAlignment;
    vAlign: VerticalAlignment;
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

export const SEPARATION_MODES = {
    blankLines: "blankLines",
    linesPerSlide: "linesPerSlide",
    symbol: "symbol",
    blankLines_linesPerSlide: "blankLines+linesPerSlide",
    symbol_linesPerSlide: "symbol+linesPerSlide",
} as const;
export type SeparationMode = typeof SEPARATION_MODES[keyof typeof SEPARATION_MODES];

export interface Separation {
    separationMode: SeparationMode,
    blankLines?: number | null;
    lines?: number | null;
    symbol?: string | null;
}

export interface SongSettings {
    orientation: Orientation;
    stanzas: number[];
    separation: Separation;
    padding: Padding;
    text1Style: TextStyle;
    text2Style: TextStyle;
    background: Background;
}

export const SLIDE_RATIOS = {
    _16x9: "16x9",
    _4x3: "4x3"
} as const;
export type SlideRatio = typeof SLIDE_RATIOS[keyof typeof SLIDE_RATIOS];

export const UNITS = {
    in: "in",
    cm: "cm",
    px: "px",
} as const;
export type Unit = typeof UNITS[keyof typeof UNITS];

export interface PresentationSettings {
    slideRatio: SlideRatio;
    unit: Unit;
    titleStyle: TextStyle;
}

export interface Song {
    id: string;
    title: string;
    lang1: string | null;
    text1: string | null;
    lang2: string | null;
    text2: string | null;
    settings: SongSettings;
}