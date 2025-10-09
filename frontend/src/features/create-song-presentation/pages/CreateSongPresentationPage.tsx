import { useRef, useState } from "react";
import SettingsPanel from "../components/SettingsPanel/SettingsPanel";
import SlidePreviewTray from "../components/SlidePreviewTray/SlidePreviewTray";
import SongInput from "../components/SongInput/SongInput";
import SongListPanel from "../components/SongListPanel/SongListPanel";

import styles from "./CreateSongPresentationPage.module.css";
import type { ResizeConfig } from "../types/ResizeConfig";
import { CSS_VARS, LAYOUT_DEFAULTS } from "../constants/css";



export default function CreateSongPresentationPage() {
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


    const songListResizeConfig: ResizeConfig = {
        minSize: LAYOUT_DEFAULTS.songList.min,
        maxSize: LAYOUT_DEFAULTS.songList.max,
        axis: "x",
        getRef: () => songRef,
        cssVarName: CSS_VARS.SONG_LIST_WIDTH,
        commit: (v) => setSongListWidth(v)
    }
    const settingsResizeConfig: ResizeConfig = {
        minSize: LAYOUT_DEFAULTS.settings.min,
        maxSize: LAYOUT_DEFAULTS.settings.max,
        axis: "-x",
        getRef: () => settingsRef,
        cssVarName: CSS_VARS.SETTINGS_WIDTH,
        commit: (v) => setSettingsWidth(v)
    }
    const previewResizeConfig: ResizeConfig = {
        minSize: LAYOUT_DEFAULTS.preview.min,
        maxSize: LAYOUT_DEFAULTS.preview.max,
        axis: "-y",
        getRef: () => previewRef,
        cssVarName: CSS_VARS.PREVIEW_HEIGHT,
        commit: (v) => setPreviewHeight(v)
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

        const onPointerUp = (upEv: PointerEvent) => {
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


    return (
        <div 
            className={styles.createSongPresentation}
            ref={containerRef}
            style={ pageStyles }>
                
            <div className={styles.mainRow}>
                <aside className={styles.songList}>
                    <SongListPanel />
                </aside>
                <div className={styles.resizerVertical} onPointerDown={attachPointerResize(songListResizeConfig)} />
                <main className={styles.songEditor}>
                    <SongInput />
                </main>
                <div className={styles.resizerVertical} onPointerDown={attachPointerResize(settingsResizeConfig)} />
                <aside className={styles.settings}>
                    <SettingsPanel />
                </aside>
            </div>
            <div className={styles.resizerHorizontal} onPointerDown={attachPointerResize(previewResizeConfig)} />
            <aside className={styles.previewTray}>
                <SlidePreviewTray />
            </aside>

            <footer>

            </footer>
        </div>
    )
}