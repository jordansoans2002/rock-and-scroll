import { useRef, useState } from "react";
import { CSS_VARS } from "../constants/css";

export type ResizeConfig = {
    minSize: number;
    maxSize: number;
    axis: "x" | "-x" | "y" | "-y";
    getRef: () => React.RefObject<number>;
    cssVarName: string,
    commit: (v: number) => void;
}

export const LAYOUT_DEFAULTS = {
    songList: { width: 300, min: 300, max: 500 },
    settings: { width: 200, min: 200, max: 300 },
    preview: { height: 200, min: 100, max: 400 },
} as const;

export const useResizablePanels = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const songRef = useRef<number>(LAYOUT_DEFAULTS.songList.width);
    const settingsRef = useRef<number>(LAYOUT_DEFAULTS.settings.width);
    const previewRef = useRef<number>(LAYOUT_DEFAULTS.preview.height);

    const [songListWidth, setSongListWidth] = useState<number>(LAYOUT_DEFAULTS.songList.width);
    const [settingsWidth, setSettingsWidth] = useState<number>(LAYOUT_DEFAULTS.settings.width);
    const [previewHeight, setPreviewHeight] = useState<number>(LAYOUT_DEFAULTS.preview.height);

    const pageStyles = {
        [CSS_VARS.SONG_LIST_WIDTH]: `${songListWidth}px`,
        [CSS_VARS.SETTINGS_WIDTH]: `${settingsWidth}px`,
        [CSS_VARS.PREVIEW_HEIGHT]: `${previewHeight}px`,

        [CSS_VARS.SONG_LIST_MIN]: `${LAYOUT_DEFAULTS.songList.min}px`,
        [CSS_VARS.SONG_LIST_MAX]: `${LAYOUT_DEFAULTS.songList.max}px`,

        [CSS_VARS.SETTINGS_MIN]: `${LAYOUT_DEFAULTS.settings.min}px`,
        [CSS_VARS.SETTINGS_MAX]: `${LAYOUT_DEFAULTS.settings.max}px`,

        [CSS_VARS.PREVIEW_MIN]: `${LAYOUT_DEFAULTS.preview.min}px`,
        [CSS_VARS.PREVIEW_MAX]: `${LAYOUT_DEFAULTS.preview.max}px`,
    } as React.CSSProperties;

    const resizeConfigs = {
        songList: {
            minSize: LAYOUT_DEFAULTS.songList.min,
            maxSize: LAYOUT_DEFAULTS.songList.max,
            axis: "x",
            getRef: () => songRef,
            cssVarName: CSS_VARS.SONG_LIST_WIDTH,
            commit: (v) => setSongListWidth(v)
        } as ResizeConfig,

        settings: {
            minSize: LAYOUT_DEFAULTS.settings.min,
            maxSize: LAYOUT_DEFAULTS.settings.max,
            axis: "-x",
            getRef: () => settingsRef,
            cssVarName: CSS_VARS.SETTINGS_WIDTH,
            commit: (v) => setSettingsWidth(v)
        } as ResizeConfig,

        preview: {
            minSize: LAYOUT_DEFAULTS.preview.min,
            maxSize: LAYOUT_DEFAULTS.preview.max,
            axis: "-y",
            getRef: () => previewRef,
            cssVarName: CSS_VARS.PREVIEW_HEIGHT,
            commit: (v) => setPreviewHeight(v)
        } as ResizeConfig
    }


    const attachPointerResize = (cfg: ResizeConfig) => (ev: React.PointerEvent) => {
        const container = containerRef.current!;
        if(!container) return;

        const startPoint = cfg.axis.includes("x") ? ev.clientX : ev.clientY;
        const startValue = cfg.getRef().current;

        const target = ev.currentTarget as Element;
        (target as Element).setPointerCapture?.((ev as any).pointerId);

        let latest = startValue;
        let raf = 0;

        const apply = (value: number) => {
            if(value < cfg.minSize) value = cfg.minSize;
            if(value > cfg.maxSize) value = cfg.maxSize;
            latest = value;
            container.style.setProperty(cfg.cssVarName, `${Math.round(value)}px`);
        };

        const onPointerMove = (moveEv: PointerEvent) => {
            const point = cfg.axis.includes("x") ? moveEv.clientX : moveEv.clientY;
            let delta = point - startPoint
            if(cfg.axis.includes("-"))
                delta = -delta;
            const newValue = startValue + delta;
            
            if(!raf) {
                raf = requestAnimationFrame(() => {
                    apply(newValue);
                    raf = 0;
                });
            }
        };

        const onPointerUp = (_: PointerEvent) => {
            if(raf) cancelAnimationFrame(raf);
            const final = Math.min(Math.max(latest, cfg.minSize), cfg.maxSize);
            cfg.commit(final);

            (target as Element).releasePointerCapture?.((ev as any).pointerId);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
    }

    return {
        containerRef,
        pageStyles,
        attachPointerResize,
        resizeConfigs
    }
}