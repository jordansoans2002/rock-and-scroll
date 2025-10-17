import { useMemo, useRef, useState } from "react";
import { ResizeConfig, useResizer } from "../../hooks/useResizer";
import DropdownTextInput from "../DropdownTextInput/DropdownTextInput";

import style from "./SongSettings.module.css"
import {  SETTING_VARS } from "../../constants/css";

const LAYOUT_DEFAULTS = {
    column: { width: 80, min: 70, max: 100 },
} as const;

export default function SongSettings() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(LAYOUT_DEFAULTS.column.width);
    const { attachResize } = useResizer(containerRef);

    const settingsResize: ResizeConfig = useMemo(() => (
        {
            minSize: LAYOUT_DEFAULTS.column.min,
            maxSize: LAYOUT_DEFAULTS.column.max,
            axis: "x",
            cssVarName: SETTING_VARS.SETTINGS_COLUMN_WIDTH,
            commit: (v) => setWidth(v)
        }
    ), []);

    const settingStyle = useMemo(() => ({
        [SETTING_VARS.SETTINGS_COLUMN_WIDTH]: `${width}px`,
        [SETTING_VARS.SETTINGS_COLUMN_MIN]: `${LAYOUT_DEFAULTS.column.min}px`,
        [SETTING_VARS.SETTINGS_COLUMN_MAX]: `${LAYOUT_DEFAULTS.column.max}px`
    } as React.CSSProperties), [width])

    return (
        <div
            ref={containerRef}
            style={ settingStyle }
            className={style.list}>

                <div className={style.row}>
                    <p className={style.label}>Font kmjbsize</p>
                    <div className={style.resizerVertical} onPointerDown={attachResize(settingsResize)}></div>
                    <DropdownTextInput 
                        suggestions={["a", "b", "c"]}
                        value={"a"}
                        onChange={() => {}} />
                </div>
        </div>
    )
}