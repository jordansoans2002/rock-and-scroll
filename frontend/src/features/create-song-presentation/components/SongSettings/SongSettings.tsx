import { useCallback, useMemo, useRef, useState } from "react";
import { ResizeConfig, useResizer } from "../../hooks/useResizer";
import DropdownTextInput from "../DropdownTextInput/DropdownTextInput";

import style from "./SongSettings.module.css"
import {  SETTING_VARS } from "../../constants/css";
import NumberInput from "../NumberInput/NumberInput";
import { ColorSetting, DropdownSelectSetting, NumberSetting } from "../../types/settings";
import ColorInput from "../ColorInput/ColorInput";
import SettingRow from "../SettingRow/SettingRow";

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

    const resize = useCallback((ev: React.PointerEvent) => {
         attachResize(settingsResize)(ev);
    }, [attachResize, settingsResize])

    const settingStyle = useMemo(() => ({
        [SETTING_VARS.SETTINGS_COLUMN_WIDTH]: `${width}px`,
        [SETTING_VARS.SETTINGS_COLUMN_MIN]: `${LAYOUT_DEFAULTS.column.min}px`,
        [SETTING_VARS.SETTINGS_COLUMN_MAX]: `${LAYOUT_DEFAULTS.column.max}px`
    } as React.CSSProperties), [width])

    const numberSetting: NumberSetting = {
        type: "number",
        key: "1",
        label: "Number",
        value: 5
    }

    const colorSetting: ColorSetting = {
        type: "color",
        key: "2",
        label: "Color",
        value: "#ffffff"
    }

    const dropdownSelect: DropdownSelectSetting = {
        type: "dropdownSelect",
        key: "2",
        label: "Color",
        value: "#ffffff",
        options: [{label:"a", value:"a"},]
    }
    return (
        <div
            ref={containerRef}
            style={ settingStyle }
            className={style.list}>

                <SettingRow 
                    label={"Setting row"}
                    resize={resize}>

                        <NumberInput
                        setting={numberSetting}
                        onChange={() => {}} />
                </SettingRow>
                <SettingRow 
                    label={"Setting row"}
                    resize={resize}>

                        <ColorInput
                        setting={colorSetting}
                        onChange={() => {}} />
                </SettingRow>
                <SettingRow 
                    label={"Setting row"}
                    resize={resize}>
                        
                        <DropdownTextInput 
                        suggestions={["a", "b", "c"]}
                        value={"a"}
                        onChange={() => {}} />
                </SettingRow>
                <SettingRow 
                    label={"Setting row"}
                    resize={resize}>
                        
                        <DropdownTextInput
                        suggestions={["a", "b", "c"]}
                        value={"a"}
                        onChange={() => {}}
                        editable={false}/>
                </SettingRow>
        </div>
    )
}