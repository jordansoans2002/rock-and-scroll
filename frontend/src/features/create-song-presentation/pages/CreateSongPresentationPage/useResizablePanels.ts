import { useMemo, useState } from "react";
import { PAGE_VARS } from "../../constants/css";
import { ResizeConfig } from "../../hooks/useResizer";

const LAYOUT_DEFAULTS = {
    songList: { width: 300, min: 300, max: 500 },
    settings: { width: 200, min: 200, max: 300 },
    preview: { height: 200, min: 100, max: 400 },
} as const;

export const useResizablePanels = () => {
    const [songListWidth, setSongListWidth] = useState<number>(LAYOUT_DEFAULTS.songList.width);
    const [settingsWidth, setSettingsWidth] = useState<number>(LAYOUT_DEFAULTS.settings.width);
    const [previewHeight, setPreviewHeight] = useState<number>(LAYOUT_DEFAULTS.preview.height);

    const pageStyles = useMemo(() => ({
        [PAGE_VARS.SONG_LIST_WIDTH]: `${songListWidth}px`,
        [PAGE_VARS.SETTINGS_WIDTH]: `${settingsWidth}px`,
        [PAGE_VARS.PREVIEW_HEIGHT]: `${previewHeight}px`,

        [PAGE_VARS.SONG_LIST_MIN]: `${LAYOUT_DEFAULTS.songList.min}px`,
        [PAGE_VARS.SONG_LIST_MAX]: `${LAYOUT_DEFAULTS.songList.max}px`,

        [PAGE_VARS.SETTINGS_MIN]: `${LAYOUT_DEFAULTS.settings.min}px`,
        [PAGE_VARS.SETTINGS_MAX]: `${LAYOUT_DEFAULTS.settings.max}px`,

        [PAGE_VARS.PREVIEW_MIN]: `${LAYOUT_DEFAULTS.preview.min}px`,
        [PAGE_VARS.PREVIEW_MAX]: `${LAYOUT_DEFAULTS.preview.max}px`,
        } as React.CSSProperties),
        [songListWidth, settingsWidth, previewHeight]
    );

    const resizeConfigs = {
        songList: {
            minSize: LAYOUT_DEFAULTS.songList.min,
            maxSize: LAYOUT_DEFAULTS.songList.max,
            axis: "x",
            cssVarName: PAGE_VARS.SONG_LIST_WIDTH,
            commit: (v) => setSongListWidth(v)
        } as ResizeConfig,

        settings: {
            minSize: LAYOUT_DEFAULTS.settings.min,
            maxSize: LAYOUT_DEFAULTS.settings.max,
            axis: "-x",
            cssVarName: PAGE_VARS.SETTINGS_WIDTH,
            commit: (v) => setSettingsWidth(v)
        } as ResizeConfig,

        preview: {
            minSize: LAYOUT_DEFAULTS.preview.min,
            maxSize: LAYOUT_DEFAULTS.preview.max,
            axis: "-y",
            cssVarName: PAGE_VARS.PREVIEW_HEIGHT,
            commit: (v) => setPreviewHeight(v)
        } as ResizeConfig
    }

    return {
        pageStyles,
        resizeConfigs
    };
}