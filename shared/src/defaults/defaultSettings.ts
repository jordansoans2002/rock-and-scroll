import { Background, Padding, PresentationSettings, Separation, SongSettings, TextStyle } from "../types/settings";

export const DEFAULT_TEXT_STYLE: TextStyle = {
  fontFamily: "Arial",
  fontSize: 32,
  fontColor: "#000000",
  align: "center",
  vAlign: "middle"
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
    symbol: "\r\n\r\n\r\n",
    lines: null
};

export const DEFAULT_SONG_SETTINGS: SongSettings = {
    separation: DEFAULT_SEPARATOR,
    orientation: "sideBySide",
    stanzas: [],
    padding: DEFAULT_PADDING,
    text1Style: DEFAULT_TEXT_STYLE,
    text2Style: DEFAULT_TEXT_STYLE,
    background: DEFAULT_BACKGROUND,
};

export const DEFAULT_PRESENTATION_SETTINGS: PresentationSettings = {
    slideRatio: "16x9",
    unit: "px",
    titleStyle: DEFAULT_TEXT_STYLE
} 