export const CSS_VARS = {
  SONG_LIST_WIDTH: "--song-list-width",
  SONG_LIST_MIN: "--song-list-min-width",
  SONG_LIST_MAX: "--song-list-max-width",

  SETTINGS_WIDTH: "--settings-width",
  SETTINGS_MIN: "--settings-min-width",
  SETTINGS_MAX: "--settings-max-width",

  PREVIEW_HEIGHT: "--preview-height",
  PREVIEW_MIN: "--preview-min-height",
  PREVIEW_MAX: "--preview-max-height",
} as const;

export const LAYOUT_DEFAULTS = {
  songList: {
    width: 250,
    min: 250,
    max: 300,
  },
  settings: {
    width: 200,
    min: 200,
    max: 300,
  },
  preview: {
    height: 200,
    min: 100,
    max: 400,
  },
} as const;