export type SettingType = "number" | "color" | "dropdownSelect" | "autocomplete";

export interface BaseSetting<T> {
    key: string;
    label: string;
    type: SettingType,
    value: T;
    description?: string;
}

export interface NumberSetting extends BaseSetting<number> {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
}

export interface ColorSetting extends BaseSetting<string> {
    type: 'color';
}

export interface DropdownSelectSetting<T = string> extends BaseSetting<T> {
    type: 'dropdownSelect'
    options: Array<{ label: string; value: T }>
}

export interface AutocompleteSetting extends BaseSetting<string> {
    type: 'autocomplete'
    suggestions: string[];
    allowCustom: boolean;
}

export type Setting = 
    | NumberSetting
    | ColorSetting
    | DropdownSelectSetting
    | AutocompleteSetting;

export interface SettingsSchema {
    [key: string]: Setting
}

export const isNumberSetting = (setting: Setting): setting is NumberSetting =>
    setting.type === 'number';

export const isColorSetting = (setting: Setting): setting is ColorSetting =>
    setting.type === 'color';

export const isDropdownSelectSetting = (setting: Setting): setting is DropdownSelectSetting =>
    setting.type === 'dropdownSelect';

export const isAutocompleteSetting = (setting: Setting): setting is AutocompleteSetting =>
    setting.type === 'autocomplete';
