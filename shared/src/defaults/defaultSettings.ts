import { Background, HORIZONTAL_ALIGNMENTS, ORIENTATIONS, Padding, PresentationSettings, Separation, SEPARATION_MODES, SLIDE_RATIOS, SongSettings, TextStyle, UNITS, VERTICAL_ALIGNMENTS } from "../types/settings";

export const DEFAULT_TEXT_STYLE: TextStyle = {
  fontFamily: "Arial",
  fontSize: 32,
  fontColor: "#000000",
  align: HORIZONTAL_ALIGNMENTS.center,
  vAlign: VERTICAL_ALIGNMENTS.middle
};

export const DEFAULT_BACKGROUND: Background = {
  color: "#FFFFFF",
};

export const DEFAULT_PADDING: Padding = {
  left: 12,
  top: 12,
  right: 12,
  bottom: 12,
  gap: 12
};

export const DEFAULT_SEPARATOR: Separation = {
    separationMode: SEPARATION_MODES.blankLines,
    blankLines: 2,
    lines: null,
    symbol: "\r\n\r\n\r\n",
};

export const DEFAULT_SONG_SETTINGS: SongSettings = {
    orientation: ORIENTATIONS.sideBySide,
    stanzas: [],
    separation: DEFAULT_SEPARATOR,
    padding: DEFAULT_PADDING,
    text1Style: DEFAULT_TEXT_STYLE,
    text2Style: DEFAULT_TEXT_STYLE,
    background: DEFAULT_BACKGROUND,
};

export const DEFAULT_PRESENTATION_SETTINGS: PresentationSettings = {
    slideRatio: SLIDE_RATIOS._16x9,
    unit: UNITS.px,
    titleStyle: DEFAULT_TEXT_STYLE
} 