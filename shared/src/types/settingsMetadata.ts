import { Background, HORIZONTAL_ALIGNMENTS, ORIENTATIONS, Padding, PresentationSettings, Separation, SEPARATION_MODES, SLIDE_RATIOS, SongSettings, TextStyle, UNITS, VERTICAL_ALIGNMENTS } from "./settings";

export type SettingType = "number" | "color" | "dropdownSelect" | "dropdownText" | "text" | "nest";

export interface SETTINGS_METADATA<T = any> {
  key: string;
  label: string;
  type: SettingType;
  description?: string;

  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: T }>;
  suggestions?: string[];

  metadata?: Record<string, SETTINGS_METADATA>,
}

export const TEXT_STYLE_METADATA: Record<keyof TextStyle, SETTINGS_METADATA> = {
  fontFamily: {
    key: "fontFamily",
    label: "Font",
    type: "dropdownText",
    suggestions: ["Arial", "Times New Roman"],
    description: "Font family for the text"
  },
  fontSize: {
    key: "fontSize",
    label: "Size",
    type: "number",
    min: 1,
    max: 144,
    step: 1,
    description: "Font size for the text",
  },
  fontColor: {
    key: "fontColor",
    label: "Color",
    type: "color",
    description: "Text color",
  },
  align: {
    key: "align",
    label: "Horizontal Alignment",
    type: "dropdownSelect",
    options: [
      { label: "Centre", value: HORIZONTAL_ALIGNMENTS.center },
      { label: "Left", value: HORIZONTAL_ALIGNMENTS.left },
      { label: "Right", value: HORIZONTAL_ALIGNMENTS.right },
      { label: "Justify", value: HORIZONTAL_ALIGNMENTS.justify },
    ],
    description: "Horizontal alignment of text"
  },
  vAlign: {
    key: "vAlign",
    label: "Vertical Alignment",
    type: "dropdownSelect",
    options: [
      { label: "Middle", value: VERTICAL_ALIGNMENTS.middle },
      { label: "Top", value: VERTICAL_ALIGNMENTS.top },
      { label: "Bottom", value: VERTICAL_ALIGNMENTS.bottom }
    ],
    description: "Vertical alignment of text"
  }
};

export const BACKGROUND_METADATA: Record<keyof Background, SETTINGS_METADATA> = {
  color: {
    key: "color",
    label: "Background Color",
    type: "color",
    description: "Background color"
  }
}

export const PADDING_METADATA: Record<keyof Padding, SETTINGS_METADATA> = {
  left: {
    key: "left",
    label: "Left",
    type: "number",
    min: 0,
    max: 800,
    step: 1,
    description: "Empty space to be kept on left side of the slide"
  },
  right: {
    key: "right",
    label: "Right",
    type: "number",
    min: 0,
    max: 800,
    step: 1,
    description: "Empty space to be kept on right side of the slide"
  },
  top: {
    key: "top",
    label: "Top",
    type: "number",
    min: 0,
    max: 800,
    step: 1,
    description: "Empty space to be kept on top of the slide"
  },
  bottom: {
    key: "bottom",
    label: "Bottom",
    type: "number",
    min: 0,
    max: 800,
    step: 1,
    description: "Empty space to be kept on bottom of the slide"
  },
  gap: {
    key: "gap",
    label: "Gap",
    type: "number",
    min: 0,
    max: 800,
    step: 1,
    description: "Empty space to be kept between lyrics of different languages"
  }
};

export const SEPARATION_METADATA: Record<keyof Separation, SETTINGS_METADATA> = {
  separationMode: {
    key: "separationMode",
    label: "Separation Mode",
    type: "dropdownSelect",
    options: [
      { label: "By blank lines in lyrics", value: SEPARATION_MODES.blankLines },
      { label: "By lines to be shown in a slide", value: SEPARATION_MODES.linesPerSlide },
      { label: "By a symbol", value: SEPARATION_MODES.symbol },
      { label: "By blank lines + lines per slide", value: SEPARATION_MODES.symbol },
      { label: "By symbol + lines per slide", value: SEPARATION_MODES.symbol },
    ],
    description: "Method by which lyrics will be separated into slides"
  },
  blankLines: {
    key: "blankLines",
    label: "Blank Lines",
    type: "number",
    min: 1,
    max: 10,
    step: 1,
    description: "Number of continous blank lines used to separate lyrics into slides"
  },
  lines: {
    key: "lines",
    label: "Lines",
    type: "number",
    min: 1,
    max: 16,
    step: 1,
    description: "Number of lines per slide"
  },
  symbol: {
    key: "symbol",
    label: "Symbol",
    type: "dropdownText",
    suggestions: [";", "###"],
    description: "Symbol to separate lyrics into separate slides"
  },
}

export const SONG_SETTINGS_METADATA: Record<keyof SongSettings, SETTINGS_METADATA> = {
  orientation: {
    key: "orientation",
    label: "Orientation",
    type: "dropdownSelect",
    options: [
      { label: "Stacked", value: ORIENTATIONS.stacked },
      { label: "Side by Side", value: ORIENTATIONS.sideBySide }
    ],
    description: "Layout orientation for lyrics in two languages"
  },
  stanzas: {
    key: "stanzas",
    label: "Stanzas",
    type: "text",
    description: "Stanzas of the song (comma separated)"
  },
  separation: {
    key: "separation",
    type: "nest",
    metadata: SEPARATION_METADATA,
    label: "Separation"
  },
  padding: {
    key: "padding",
    label: "Padding",
    type: "nest",
    metadata: PADDING_METADATA,
  },
  text1Style: {
    key: "text1Style",
    label: "Text1 Style",
    type: "nest",
    metadata: TEXT_STYLE_METADATA,
  },
  text2Style: {
    key: "text2Style",
    label: "Text2 Style",
    type: "nest",
    metadata: TEXT_STYLE_METADATA,
  },
  background: {
    key: "background",
    label: "Background",
    type: "nest",
    metadata: BACKGROUND_METADATA,
  }
};

export const PRESENTATION_SETTINGS_METADATA: Record<keyof PresentationSettings, SETTINGS_METADATA> = {
  slideRatio: {
    key: "slideRatio",
    label: "Slide Ratio",
    type: "dropdownSelect",
    options: [
      { label: "16x9", value: SLIDE_RATIOS._16x9 },
      { label: "4x3", value: SLIDE_RATIOS._4x3}
    ],
    description: "Aspect ratio of slides"
  },
  unit: {
    key: "unit",
    label: "Unit",
    type: "dropdownSelect",
    options: [
      { label: "in", value: UNITS.in },
      { label: "cm", value: UNITS.cm },
      { label: "px", value: UNITS.px },
    ],
    description: "Unit for padding"
  },
  titleStyle: {
    key: "titleStyle",
    label: "Title Style",
    type: "nest",
    metadata: TEXT_STYLE_METADATA
  }
}

// Helper to get nested value
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
};

// Helper to set nested value
export const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((curr, key) => {
    if (!curr[key]) curr[key] = {};
    return curr[key];
  }, obj);
  target[lastKey] = value;
  return obj;
};