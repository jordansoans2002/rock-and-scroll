import { useState, useMemo, useCallback, useRef } from "react";
import { SETTING_VARS } from "../../../constants/css";
import { useResizer, ResizeConfig } from "../../../hooks/useResizer";

const LAYOUT_DEFAULTS = {
    column: { width: 120, min: 120, max: 150 },
} as const;

export const useResizableColumns = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(LAYOUT_DEFAULTS.column.width);
    const { attachResize } = useResizer(containerRef);

    const settingsResize: ResizeConfig = useMemo(() => (
        {
            minSize: LAYOUT_DEFAULTS.column.min,
            maxSize: LAYOUT_DEFAULTS.column.max,
            axis: "-x",
            cssVarName: SETTING_VARS.SETTINGS_COLUMN_WIDTH,
            commit: (v) => setWidth(v)
        }
    ), []);

    const resize = useCallback((ev: React.PointerEvent) => {
            attachResize(settingsResize)(ev);
    }, [attachResize, settingsResize])

    const settingStyle = useMemo(() => ({
        [SETTING_VARS.SETTINGS_COLUMN_WIDTH]: `${width}px`,
        [SETTING_VARS.SETTINGS_COLUMN_MIN]: `${LAYOUT_DEFAULTS.column.min}px`,
        [SETTING_VARS.SETTINGS_COLUMN_MAX]: `${LAYOUT_DEFAULTS.column.max}px`
    } as React.CSSProperties), [width])

    return { containerRef, settingStyle, resize }
}