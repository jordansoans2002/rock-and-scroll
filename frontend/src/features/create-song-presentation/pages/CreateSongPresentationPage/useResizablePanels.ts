import { useCallback, useMemo, useRef, useState } from "react";
import { PAGE_VARS } from "../../constants/css";
import { ResizeConfig, useResizer } from "../../hooks/useResizer";

const LAYOUT_DEFAULTS = {
    songList: { width: 300, min: 300, max: 350 },
    settings: { width: 250, min: 250, max: 300 },
    preview: { height: 200, min: 100, max: 400 },
} as const;

export const useResizablePanels = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [songListWidth, setSongListWidth] = useState<number>(LAYOUT_DEFAULTS.songList.width);
    const [settingsWidth, setSettingsWidth] = useState<number>(LAYOUT_DEFAULTS.settings.width);
    const [previewHeight, setPreviewHeight] = useState<number>(LAYOUT_DEFAULTS.preview.height);
    const { attachResize } = useResizer(containerRef);
    

    const stylesWidth = useMemo(() => ({
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

    const songListResizeCfg: ResizeConfig = useMemo(() => (
        {
            minSize: LAYOUT_DEFAULTS.songList.min,
            maxSize: LAYOUT_DEFAULTS.songList.max,
            axis: "x",
            cssVarName: PAGE_VARS.SONG_LIST_WIDTH,
            commit: (v) => setSongListWidth(v)
        }
    ), []); 

    const settingsResizeCfg: ResizeConfig = useMemo(() =>(
        {
            minSize: LAYOUT_DEFAULTS.settings.min,
            maxSize: LAYOUT_DEFAULTS.settings.max,
            axis: "-x",
            cssVarName: PAGE_VARS.SETTINGS_WIDTH,
            commit: (v) => setSettingsWidth(v)
        }
    ), []);

    const previewResizeCfg: ResizeConfig = useMemo(() => (
        {
            minSize: LAYOUT_DEFAULTS.preview.min,
            maxSize: LAYOUT_DEFAULTS.preview.max,
            axis: "-y",
            cssVarName: PAGE_VARS.PREVIEW_HEIGHT,
            commit: (v) => setPreviewHeight(v)
        }
    ), []);

    const resizeSongList = useCallback((ev: React.PointerEvent) => {
        attachResize(songListResizeCfg)(ev);
    }, [attachResize, songListResizeCfg]);
    const resizeSettings = useCallback((ev: React.PointerEvent) => {
        attachResize(settingsResizeCfg)(ev);
    }, [attachResize, settingsResizeCfg]);
    const resizePreview = useCallback((ev: React.PointerEvent) => {
        attachResize(previewResizeCfg)(ev);
    }, [attachResize, previewResizeCfg]);

    return {
        containerRef,
        stylesWidth,
        resizeSongList,
        resizeSettings,
        resizePreview,
    };
}